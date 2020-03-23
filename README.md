# Simple NodeJS Clipboard sync app

Just *hacky wanna-be* app to share textual data between all opened instances.
Much simpler than ap app for chatting.

## Purpose

1. Sharing things between PC and [Firefox Reality](https://mixedreality.mozilla.org/firefox-reality/) browser where copy-pasting becomes much more convenient than
2. Just for learning and due to my laziness only UTF-8 strings are passed, so even "protocol" is simple.
3. Might take a part as source for teaching someone about WebSockets.

## Usage

1. Clone this repository
2. Go to the project directory
3. `npm i`
4. `npm run watch`

## Technologies

* NodeJS
* TypeScript 3.8 + `ts-node`
* `express`
* `websocket`

## Recommended IDE

* [VSCode](https://code.visualstudio.com/) + extension `lit-html` for HTML syntax highlighting within `.ts` file