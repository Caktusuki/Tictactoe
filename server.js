const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];
let gameState = Array(9).fill(null);
let currentTurn = 'X';

wss.on('connection', (ws) => {
    clients.push(ws);

    // Send the initial game state to the new client
    ws.send(JSON.stringify({ type: 'init', gameState, currentTurn }));

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'move') {
            const { index, player } = data;
            if (gameState[index] === null && player === currentTurn) {
                gameState[index] = player;
                currentTurn = currentTurn === 'X' ? 'O' : 'X';

                // Broadcast the updated game state to all clients
                clients.forEach(client => {
                    client.send(JSON.stringify({ type: 'update', gameState, currentTurn }));
                });
            }
        }
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');