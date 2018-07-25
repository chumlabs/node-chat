const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocation } = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('a client has connected...');

  // greeting to connecting client
  socket.emit('newMessage', generateMessage('admin', 'welcome to the mix!'));

  // message to other clients about new connection
  socket.broadcast.emit(
    'newMessage',
    generateMessage('admin', `a new user has joined the mélange`)
  );

  // message listener
  socket.on('createMessage', ({ from, text }, callback) => {
    console.log(`a message was received from ${from}`);

    // send acknowledgement to sender
    callback(`server received your message`);

    // send to all connected clients
    io.emit('newMessage', generateMessage(from, text));

    // send to all connected clients
    // io.emit('newMessage', {
    //   from,
    //   text,
    //   createdAt: Date.now()
    // });

    // send to all but sender
    // socket.broadcast.emit('newMessage', {
    //   from,
    //   text,
    //   createdAt: Date.now()
    // });
  });

  // location listener
  socket.on('createLocationMessage', ({ latitude, longitude }) => {
    io.emit('newLocation', generateLocation('admin', { latitude, longitude }));
  });

  socket.on('disconnect', () => {
    console.log('a client has diconnected...');
  });
});

server.listen(port, () => console.log(`server is running on port ${port}`));
