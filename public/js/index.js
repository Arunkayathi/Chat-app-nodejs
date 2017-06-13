var socket=io();
socket.on('connect',function(){
        console.log('connected to server');

});

socket.on('disconnect',function(){
    console.log('Disconnected from the server');
});

socket.on('newMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
  var template=jQuery("#message-template").html();
  var html=Mustache.render(template,{
    text:message.text,
    from:message.from,
    createdAt:formattedTime
  });
    jQuery('#messages').append(html);
});
socket.on('newLocationMessage',function(message){
  var formattedTime=moment(message.createdAt).format('h:mm a');
    var template=jQuery("#locationMessage-template").html();
    var html=Mustache.render(template,{
      from:message.from,
      createdAt:formattedTime,
      url:message.url
    });
    jQuery('#messages').append(html);

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
    locationPosition.attr('disabled','disabled').text('Sending location...');
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
