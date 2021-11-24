import {io} from "../IO";

export const namesOf = (room: string): string[] => {

    return socketsOf(room).map((socketId: string) => {
        const socket = io.sockets.sockets.get(socketId);

        if (typeof socket?.nick === 'string') {
            return socket.nick
        }
        return 'Unknown';
    });
}

export const socketsOf = (room: string): string[] => {
    let socketsIds: string[] = [];

    const roomMap = io.sockets.adapter.rooms.get(room);

    if (roomMap !== undefined) {
        socketsIds = Array.from(roomMap);
    }

    return socketsIds;
}



