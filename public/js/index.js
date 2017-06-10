var socket=io();
socket.on('connect',function(){
        console.log('connected to server');
socket.emit('createMessage',{
        from:'Arun',
        text:'This is another message'
});
});

socket.on('disconnect',function(){
    console.log('Disconnected from the server');
});

socket.on('newMessage',function(message){
    console.log('new message',message);
});
