import {Server} from "socket.io";
import {createServer} from "http";
import {ClientEvents, ServerEvents} from "./config/events";

export const httpServer = createServer();
export const io: Server<ClientEvents, ServerEvents> = new Server(httpServer);