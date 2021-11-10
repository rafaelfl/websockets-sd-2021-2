const ws = require('ws');
const express = require('express');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Escutando na porta ${PORT}`));

const wss = new ws.Server({ server });

wss.on("connection", (socket) => {
    console.log("Conexão estabelecida...");

    socket.on("message", (message) => {
        // console.log(`- Mensagem recebida: ${message}`);
        // socket.send("Muito obrigado pela sua mensagem! :)")

        wss.clients.forEach((clientSocket) => {
            clientSocket.send(message.toString());
        });
    });
});

// console.log(`Escutando com o protocolo WebSocket na porta ${PORT}`);