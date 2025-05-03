// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('join', room => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
    socket.to(room).emit('ready');
  });

  socket.on('offer', (offer, room) => {
    socket.to(room).emit('offer', offer);
  });

  socket.on('answer', (answer, room) => {
    socket.to(room).emit('answer', answer);
  });

  socket.on('ice-candidate', (candidate, room) => {
    socket.to(room).emit('ice-candidate', candidate);
  });
});

http.listen(3000, () => {
  console.log('Signaling server running on http://localhost:3000');
});