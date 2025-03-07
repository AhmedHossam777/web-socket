const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('chat message', (msg) => {
		console.log('Message received: ' + msg);
		io.emit('chat message', msg); // Broadcast to all clients
	});

	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

const PORT = 3000;
server.listen(PORT, () => {
	console.log(`Socket.IO server running at http://localhost:${PORT}`);
});