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

  var formattedTime = moment(createdAt).format('h:mm a');

  var li = $('<li></li>');
  li.text(`${from} [ ${formattedTime} ]: ${text}`);
  $('#messages').append(li);
});

// newLocation listener
socket.on('newLocation', ({ from, url, createdAt }) => {
  console.log('location received');

  var formattedTime = moment(createdAt).format('h:mm a');

  var li = $('<li></li>');
  var a = $(`<a target=_blank>Click to see my current location</a>`);

  li.text(`${from} [ ${formattedTime} ]: `);
  a.attr('href', url);
  li.append(a);

  $('#messages').append(li);
});

// add form input change listener
$('#message-form').on('keyup', function(e) {
  var messageButton = $('#send-message');
  var messageTextbox = $('[name=message]');

  // console.log(e.type);

  if (messageTextbox.val() === '') messageButton.attr('disabled', 'true');
  else messageButton.removeAttr('disabled');
});

// add form submit event listener & handler
$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');

  // send message
  socket.emit(
    'createMessage',
    {
      from: 'jahlive',
      text: messageTextbox.val()
    },
    function(data) {
      console.log(`${data}`);
      messageTextbox.val('');
    }
  );

  // focus back on message input box
  messageTextbox.focus();
});

// location button listener & handler
var locationButton = $('#send-location');
locationButton.on('click', function(e) {
  if (!navigator.geolocation) return alert('geoloction not supported on your browser');

  var messageTextbox = $('[name=message]');

  // disable send location button
  locationButton.attr('disabled', 'true').text('Sending Now...');

  navigator.geolocation.getCurrentPosition(
    function({ coords: { latitude, longitude } }) {
      // re-enable send location button
      locationButton.removeAttr('disabled').text('Send Location');

      // send location to server
      socket.emit('createLocationMessage', {
        latitude,
        longitude
      });

      // focus back on message input box
      messageTextbox.focus();
    },
    function() {
      // re-enable send location button
      locationButton.removeAttr('disabled').text('Send Location');

      alert('unable to retrieve your location');
    }
  );
});
