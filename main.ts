import * as http from 'http';

import * as express from 'express';
import { server as WebSocketServer, request as WebSocketRequest } from 'websocket';



const app = express()
const port = 3000
const srv = http.createServer(app);

const clipProtocolToken = "clipboard-prot"
const reloadMessage = '85c76dcae2299d2235c793fe3425bd88376f5c4721cfddc1c9a9c452c20c5d33';
const connections = [];
var clipboardValue = "";

// dummy function hack for syntax highlighting functionality by `lit-html`
function html(strings: TemplateStringsArray, ...values: any[]): string {
	return strings.reduce((p, c, i) => p + c + (values?.[i]?.toString() || ''), '');
}

function setupServer() {
	app.get('/', (req, res) => res.send(html`
		<!DOCTYPE html>
		<html lang="">
			<head>
				<meta charset="utf-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title>Clipboard</title>
				<style>
					.field {
						display: flex;
						height: 100px;
					}
					.field .control textarea {
						resize: none;
						border: 0;
						margin: 0;
					}
					.field .control,
					.field .control > * {
						display: block;
						height: 100%;
						border: 1px solid #aaa;
					}
				</style>
			</head>
			<body>
				<div class="field">
					<div class="control">
						<textarea id="field"></textarea>
					</div>
					<div class="control">
						<button id="to-clipboard">📋</button>
					</div>
				</div>

				<script>
					const field = document.getElementById("field");
					const clpBtn = document.getElementById("to-clipboard");


					const mainSocket = new WebSocket("ws://" + window.location.host, "${clipProtocolToken}");
					mainSocket.onmessage = function(event) {
						const msg = event.data;
						switch (msg) {
							case '${reloadMessage}':
								setTimeout(() => location.reload(true), 3999);
								document.body.innerHTML = document.body.innerHTML + "<br>Will reload in ~3s!";
							break;
							default:
								field.value = msg;
						}
					}
					field.oninput = (e) => {
						mainSocket.send(field.value);
					}


					clpBtn.onclick = () => {
						const oldFocusEl = document.activeElement;
						field.select();
						field.setSelectionRange(0, 9999);
						document.execCommand("copy");
						field.setSelectionRange(0, 0);
						oldFocusEl.focus();
					}
				</script>
			</body>
		</html>
	`))

	const wsServer = new WebSocketServer({
		httpServer: srv,
		fragmentOutgoingMessages: false
	});

	wsServer.on('request', function (request: WebSocketRequest) {
		const connection = request.accept(clipProtocolToken);
		connections.push(connection);
		console.log(`${connection.remoteAddress} connected`);
		connection.sendUTF(clipboardValue);

		connection.on('close', function () {
			console.log(`${connection.remoteAddress} disconnected`);
			const index = connections.indexOf(connection);
			if (index !== -1) {
				connections.splice(index, 1);
			}
		});

		connection.on('message', function (message) {
			if (message.type === 'utf8') {
				try {
					const msg = message.utf8Data;
					if (msg != reloadMessage) {
						clipboardValue = msg;
						console.log(clipboardValue);
						connections.forEach(function (tgt) {
							tgt.sendUTF(msg);
						});
					}
				}
				catch (e) {
				}
			}
		});
	});
}

process.once("SIGHUP", function () {
	connections.forEach(function (tgt) {
		tgt.sendUTF(reloadMessage);
	});
	process.exit(0);
})

setupServer();
srv.listen(port, () => console.log(`Clipboard app listening on port ${port}!`));
