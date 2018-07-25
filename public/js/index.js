var socket = io();

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', ({ from, text, createdAt }) => {
  console.log(`new message arrived`);

  var li = $('<li></li>');
  li.text(`${from}: ${text}`);
  $('#messages').append(li);
});

// add form submit event listener
$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit(
    'createMessage',
    {
      from: 'jahlive',
      text: $('[name=message]').val()
    },
    function(data) {
      console.log(`${data}`);
    }
  );
});

// format of createMessage event
// socket.emit('createMessage', {
//   from: 'thoseamungus@stilltrying.com',
//   text: 'can we start turning this into something worthwhile?'
// });
