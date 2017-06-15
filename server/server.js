const path=require('path');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
var {generateMessage,generateLocationMessage}=require('./utils/message');
var port=process.env.PORT||3000;
var app=express();
var publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIo(server);

io.on('connection',(socket)=>{
    console.log('new user is connected');
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));


    socket.broadcast.emit('newMessage',generateMessage('Admin','new user has joined'));
    socket.on('createMessage',(message,callback)=>{
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback();

    });

    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });


});
server.listen(port,()=>{
    console.log(`server has started listening on port ${port}`);
});
