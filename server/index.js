const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

io.on('connection', (socket) => {
  // console.log('user connect');
  socket.on('new message', (msg) => {
    socket.broadcast.emit('new message', msg);
  });

  socket.on('new messaging', (msg) => {
    socket.broadcast.emit('new messaging', Object.assign(msg, { id: socket.id }));
  });

  socket.on('new editing', (id) => {
    console.log('new', id);
    socket.to(id).emit('new editing', {});
  });

  socket.on('editing image', ({ id, data }) => {
    console.log('edit', id);
    socket.broadcast.emit(`editing image:${id}`, data);
  })

  socket.on('remove messaging', (msg) => {
    console.log(msg);
    socket.broadcast.emit('remove messaging', msg);
  });
})

server.listen(4000, () => {
  console.log("Server Started. http://localhost:4000");
});
