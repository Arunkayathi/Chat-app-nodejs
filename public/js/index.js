var socket=io();
socket.on('connect',function(){
        console.log('connected to server');

});

socket.on('disconnect',function(){
    console.log('Disconnected from the server');
});

socket.on('newMessage',function(message){
    var li=jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});
socket.on('newLocationMessage',function(message){
    var li=jQuery('<li></li>');
    var a=jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}:`);
    a.attr('href',message.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  

  socket.emit('createMessage', {
    from: 'User',
    text:jQuery('[name=message]').val()

  }, function () {

  jQuery('[name=message]').val(' ');

  });
});


var locationPosition=jQuery('#location');
locationPosition.on('click',function(){
    if(!navigator.geolocation){
        return alert('Geo location is not supported by the browser');
    }
    locationPosition.attr('disabled','disabled').text('Sending location...')
    navigator.geolocation.getCurrentPosition(function(position){
      locationPosition.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage',{
                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            });
    },function(){
          locationPosition.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    });
});
