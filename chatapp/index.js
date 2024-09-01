const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    socket.username = username;
    io.emit('chat message', { username: 'System', message: `${username} joined the chat` });
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { username: socket.username, message: msg });
  });

  socket.on('disconnect', () => {
    io.emit('chat message', { username: 'System', message: `${socket.username} left the chat` });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:3000/`);
});
