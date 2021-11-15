export default class RoomsManager {
    static fetchRoom(roomToJoin: any, existingRooms: Map<string, Set<string>>): string {

        const roomToJoinExists = existingRooms.get(roomToJoin) !== undefined;

        if (typeof roomToJoin === 'string' && roomToJoinExists && this.checkRoomHex(roomToJoin)) {
            return roomToJoin;
        } else {
            return this.newRoom(existingRooms);
        }
    }

    private static newRoom(existingRooms: Map<string, Set<string>>): string {
        const room = [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

        return existingRooms.get(room) === undefined ? room : this.newRoom(existingRooms);
    }

    private static checkRoomHex(hex: string): boolean {
        return /^[0-9A-F]{8}$/i.test(hex);
    }

}

