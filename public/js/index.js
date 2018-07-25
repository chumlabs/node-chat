// set up socket.io listeners
var socket = io();

// connection established with server
socket.on('connect', function() {
  console.log('connected to server');
});

// disconnection with server
socket.on('disconnect', function() {
  console.log('disconnected from server');
});

// newMessage listener
socket.on('newMessage', ({ from, text, createdAt }) => {
  console.log(`new message arrived`);

  var li = $('<li></li>');
  li.text(`${from}: ${text}`);
  $('#messages').append(li);
});

// newLocation listener
socket.on('newLocation', ({ from, url, createdAt }) => {
  console.log('location received');

  var li = $('<li></li>');
  var a = $(`<a target=_blank>Click to see location</a>`);

  li.text(`${from}: a user send their location. `);
  a.attr('href', url);
  li.append(a);

  $('#messages').append(li);
});

// add form submit event listener & handler
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

// location button listener & handler
var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) return alert('geoloction not supported on your browser');

  navigator.geolocation.getCurrentPosition(
    function({ coords: { latitude, longitude } }) {
      socket.emit('createLocationMessage', {
        latitude,
        longitude
      });
    },
    function() {
      alert('unable to retrieve your location');
    }
  );
});
