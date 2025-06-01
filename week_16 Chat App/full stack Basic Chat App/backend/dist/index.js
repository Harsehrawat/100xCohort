"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 5173 });
let allSockets = [];
const chatHistory = {}; // in-memory history per room
console.log("WebSocket server started on ws://localhost:5173");
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            const { roomId, username } = parsedMessage.payload;
            // Save user info
            allSockets.push({
                socket,
                room: roomId,
                username: username || "Anonymous",
            });
            // Initialize history store for the room if not exists
            if (!chatHistory[roomId])
                chatHistory[roomId] = [];
            // Send existing chat history to this user
            chatHistory[roomId].forEach((msg) => {
                socket.send(msg);
            });
            // Notify room about the new user
            broadcastToRoom(roomId, `${username} has joined the room.`, socket);
            // Send updated user list
            sendUserListToRoom(roomId);
        }
        else if (parsedMessage.type === "chat") {
            const user = allSockets.find((u) => u.socket === socket);
            if (!user)
                return;
            const messageText = parsedMessage.payload.message;
            const timestampedMessage = `${user.username} [${new Date().toLocaleTimeString()}]: ${messageText}`;
            // Save message to history
            chatHistory[user.room].push(timestampedMessage);
            // Broadcast message
            broadcastToRoom(user.room, timestampedMessage);
        }
        else if (parsedMessage.type === "typing") {
            const user = allSockets.find((u) => u.socket === socket);
            if (!user)
                return;
            broadcastToRoom(user.room, `${user.username} is typing...`, socket);
        }
    });
    socket.on("close", () => {
        const userIndex = allSockets.findIndex((u) => u.socket === socket);
        if (userIndex !== -1) {
            const user = allSockets[userIndex];
            allSockets.splice(userIndex, 1);
            broadcastToRoom(user.room, `${user.username} has left the room.`);
            sendUserListToRoom(user.room);
        }
    });
});
// Broadcast to everyone in a room (optionally excluding one socket)
function broadcastToRoom(roomId, message, excludeSocket) {
    allSockets
        .filter((u) => u.room === roomId && u.socket.readyState === ws_1.WebSocket.OPEN)
        .forEach((u) => {
        if (u.socket !== excludeSocket) {
            u.socket.send(message);
        }
    });
}
// Send the list of current users in a room
function sendUserListToRoom(roomId) {
    const users = allSockets
        .filter((u) => u.room === roomId)
        .map((u) => u.username);
    const payload = JSON.stringify({
        type: "user-list",
        payload: { users },
    });
    allSockets
        .filter((u) => u.room === roomId && u.socket.readyState === ws_1.WebSocket.OPEN)
        .forEach((u) => u.socket.send(payload));
}
