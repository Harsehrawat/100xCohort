"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
console.log("WebSocket server started on ws://localhost:8080");
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        var _a;
        //
        const parsedMessage = JSON.parse(message);
        // check it's type 
        if (parsedMessage.type === "join") {
            // add to allSockets 
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === "chat") {
            // see if there's a valid room present for this chat
            const currUserRoom = (_a = allSockets.find(x => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            // now send the message to all the sockets w/ room same as currUserRoom
            if (currUserRoom) {
                allSockets
                    .filter(x => x.room == currUserRoom)
                    .forEach(x => x.socket.send(parsedMessage.payload.message));
            }
        }
    });
});
