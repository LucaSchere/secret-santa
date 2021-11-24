import {Server} from "socket.io";
import {createServer} from "http";

export const httpServer = createServer();
export const io = new Server(httpServer);