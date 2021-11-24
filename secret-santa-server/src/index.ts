import {handleConnection} from "./handlers/HandleConnection";
import {io, httpServer} from "./IO";

declare module 'socket.io' {
    interface Socket {
        nick: string;
    }
}

io.on("connection", handleConnection);

httpServer.listen(3000);
console.log('server listening on port 3000');