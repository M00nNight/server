const express = require("express");
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

app.use(express.static(__dirname)); // Serve static files

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: __dirname });
});

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    const numClients = wss.clients.size;
    console.log('Clients connected:', numClients);

    wss.broadcast(`Current visitor: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send('Welcome to my server. Regards, Zamil Khan');
    }

    ws.on('close', function close() {
        const numClients = wss.clients.size;
        wss.broadcast(`Current visitors: ${numClients}`);
        console.log('A client has disconnected');
    });
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

server.listen(3000, function() {
    console.log('Server started on port 3000');
});
