import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User{
    socket : WebSocket,
    room : string;
}

let allSockets: User[] = [];

console.log("WebSocket server started on ws://localhost:8080");

wss.on("connection",(socket) =>{
    socket.on("message", (message)=>{
        //
        const parsedMessage = JSON.parse(message as unknown as string);
        // check it's type 
        if(parsedMessage.type === "join"){
            // add to allSockets 
            allSockets.push({
                socket,
                room : parsedMessage.payload.roomId
            });
        }
        if(parsedMessage.type === "chat"){
            // see if there's a valid room present for this chat
            const currUserRoom = allSockets.find(x => x.socket == socket)?.room;
            // now send the message to all the sockets w/ room same as currUserRoom
            if(currUserRoom){
                allSockets
                .filter( x => x.room == currUserRoom)
                .forEach( x => x.socket.send(parsedMessage.payload.message));
            }
            
        }
    })
})
