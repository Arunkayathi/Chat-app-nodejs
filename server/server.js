const path=require('path');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
var port=process.env.PORT||3000;
var app=express();
var publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIo(server);

io.on('connection',(socket)=>{
    console.log('new user is connected');
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to chitchat with friends',
        createdAt:new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user has joined',
        createdAt:new Date().getTime()
    });
    socket.on('createMessage',(newMessage)=>{
        io.emit('newMessage',{
            from:newMessage.from,
            text:newMessage.text,
            createdAt:new Date().getTime()
        });
    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });


});
server.listen(port,()=>{
    console.log(`server has started listening on port ${port}`);
});
