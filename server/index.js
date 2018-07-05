const express = require('express');
const path = require('path');
const app = express();


const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

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

app.get('*', (req, res) => res.sendfile('/index.html'));

const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Server Started. http://localhost:${port}`);
});
