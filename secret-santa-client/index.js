var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('secret-santa-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.send(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect(
    'ws://localhost:8080/',
    'secret-santa-protocol',
    'localhost',
    {},
);