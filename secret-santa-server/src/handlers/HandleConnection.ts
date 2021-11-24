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

    socket.on('disconnect', () => {
            io.to(room).emit('user:left', {
                room,
                clients: namesOf(room),
            });
        }
    )

    socket.on('draw', (params) => {
        if (params.socketId === socket.id && io.sockets.adapter.rooms.has(params.room)) {

            const room = io.sockets.adapter.rooms.get(params.room);
            const firstSocket = room?.values().next().value;

            if (firstSocket === params.socketId) {
                // Todo
            }

        }
    });
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
