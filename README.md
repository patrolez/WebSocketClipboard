# Simple NodeJS WebSocket Clipboard sharing/sync app

Just *hacky wanna-be* app to share textual data between all opened instances.
Much simpler than an app for chatting.

## Purpose

1. Sharing things between PC and [Firefox Reality](https://mixedreality.mozilla.org/firefox-reality/) browser where copy-pasting becomes much more convenient than typing within VR/AR by controllers.
2. Just for learning and due to my laziness only UTF-8 strings are passed, so even "protocol" is simple.
3. Might take a part as source for teaching someone about WebSockets.

## Usage

1. Clone this repository
2. Go to the project directory
3. `npm i`
4. `npm run watch`
5. Open served site under your IP address and port 3000, so `http://<YOUR_NETWORK_CARD'S_IP_ADDRESS>:3000/`

## Everyone can dream

>I wish it to be a single file project (just like writting in `bash`) without any extra project files, where an interpreter has a rich standard library.

>I wish a TypeScript to be the only JavaScript.

## Plans

Maybe some day I would bundle it as a single file thing. Maybe as a single file in term of `.js`/`.mjs` or packed by `nexe` or `zeit/pkg`.

## Technologies

* NodeJS
* TypeScript 3.8 + `ts-node`
* `express`
* `websocket`

## Recommended IDE

* [Free. VSCode](https://code.visualstudio.com/) + extension `lit-html` for HTML syntax highlighting within `.ts` file
