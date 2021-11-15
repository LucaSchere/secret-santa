import Session from "./Session";
import {IncomingMessage, ServerResponse} from "http";
import {Message, request} from "websocket";
import Client from "./Client";

const WebSocketServer = require('websocket').server;
const http = require('http');

const trustedOrigin = 'localhost';
const server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.writeHead(404);
    response.end();
});

server.listen(8080, () => {
    console.log((new Date()) + ' Server is listening on port 8080');
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

const originIsAllowed = (origin: string) => {
    return origin === trustedOrigin;
}

wsServer.on('request', (request: request) => {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        return;
    }
    const connection = request.accept('secret-santa-protocol', request.origin);

    const clientSession = request.httpRequest.headers.sessionId;

    const client = new Client('test', connection.remoteAddress, clientSession);

    if (clientSession) {

    } else {
        const createdSession = new Session('123', client);
        console.log(createdSession)
    }

    connection.on('message', function(message: Message) {
        /*
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        */
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});