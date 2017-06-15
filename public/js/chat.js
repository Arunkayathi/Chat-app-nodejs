var socket=io();

function scrollToBottom (){

var messages=jQuery('#messages');
var newMessage=messages.children('li:last-child');
var clientHeight=messages.prop('clientHeight');
var scrollHeight=messages.prop('scrollHeight');
var scrollTop=messages.prop('scrollTop');
var newMessageHeight=newMessage.innerHeight();
var lastMessageHeight=newMessage.prev().innerHeight();


  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }

}
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
    scrollToBottom();
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
    scrollToBottom();

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
