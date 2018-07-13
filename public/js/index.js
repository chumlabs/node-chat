var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', messageData => {
  console.log(messageData);
});

// socket.emit('createMessage', {
//   from: 'thoseamungus@stilltrying.com',
//   text: 'can we start turning this into something worthwhile?'
// });
