import { createServer } from "http";
import { Server, Socket } from "socket.io";
import RoomsManager from "./helpers/RoomsManager";

const httpServer = createServer();
const io = new Server(httpServer);

io.on("connection", (socket: Socket) => {

    const roomToJoin: string | string[] | undefined = socket.handshake.query.room;
    const existingRooms = io.sockets.adapter.rooms;

    const room: string = RoomsManager.fetchRoom(roomToJoin, existingRooms);

    socket.join(room);

    io.to(room).emit('user-joined')

    socket.on('evaluation', () => {
        io.to(room).emit('evaluation');
    })

});

httpServer.listen(3000);