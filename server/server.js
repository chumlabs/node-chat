const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('a client has connected...');

  socket.emit('newMessage', {
    from: 'admin',
    text: 'welcome to the mix!',
    createdAt: Date.now()
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: `a new user has joined the mélange`,
    createdAt: Date.now()
  });

  socket.on('createMessage', ({ from, text }) => {
    console.log(`a message was received from ${from}`);

    // io.emit('newMessage', {
    //   from,
    //   text,
    //   createdAt: Date.now()
    // });

    socket.broadcast.emit('newMessage', {
      from,
      text,
      createdAt: Date.now()
    });
  });

  socket.on('disconnect', () => {
    console.log('a client has diconnected...');
  });
});

server.listen(port, () => console.log(`server is running on port ${port}`));
