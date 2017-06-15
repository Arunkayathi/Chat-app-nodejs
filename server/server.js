const path=require('path');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
var {generateMessage,generateLocationMessage}=require('./utils/message');
var {isRealString}=require('./utils/validation');
var port=process.env.PORT||3000;
var app=express();
var publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIo(server);

io.on('connection',(socket)=>{

    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name are required');
        }
        socket.join(params.room);

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });


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
