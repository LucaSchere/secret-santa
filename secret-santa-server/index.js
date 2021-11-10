const WebSocketServer = require('websocket').server;
const http = require('http');

const trustedOrigin = 'localhost';
const server = http.createServer((request, response) => {
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

const originIsAllowed = (origin) => {
    console.log(origin)
    return origin === trustedOrigin;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        request.reject();
        return;
    }

    const connection = request.accept('secret-santa-protocol', request.origin);
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});