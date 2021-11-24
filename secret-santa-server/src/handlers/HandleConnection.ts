import {Socket} from "socket.io";
import RoomsManager from "../helpers/RoomsManager";
import {io} from "../IO";
import {namesOf} from "../helpers/FetchClientsOfRoom";

export const handleConnection = (socket: Socket) => {

    const nick = fetchNick(socket);
    const room = fetchRoom(socket);

    socket.nick = nick;
    socket.join(room);

    respond(room);

    console.log(io.sockets.adapter.rooms);

    io.on('disconnect', (args) => {
            io.to(room).emit('user:left', {
                room,
                clients: namesOf(room),
            });
        }
    )
}

const respond = (room: string) => {

    io.to(room).emit('user:joined', {
        room,
        clients: namesOf(room),
    });
}

const fetchNick = (socket: Socket) => {
    return typeof socket.handshake.query.nick === 'string' && socket.handshake.query.nick.length > 0
        ? socket.handshake.query.nick
        : 'Unknown';
}

const fetchRoom = (socket: Socket) => {
    const roomToJoin: string | string[] | undefined = socket.handshake.query.room;
    const existingRooms = io.sockets.adapter.rooms;
    return RoomsManager.fetchRoom(roomToJoin, existingRooms);
}
