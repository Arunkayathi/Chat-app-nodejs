const path=require('path');
const express=require('express');
const http=require('http');
const socketIo=require('socket.io');
var {generateMessage,generateLocationMessage}=require('./utils/message');
var {isRealString}=require('./utils/validation');
var {Users}=require('./utils/users');
var {Rooms}=require('./utils/rooms');
var port=process.env.PORT||3000;
var app=express();
var publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

var server=http.createServer(app);
var io=socketIo(server);
var users=new Users();
var rooms=new Rooms();

io.on('connection',(socket)=>{
    
    socket.emit('updateRoomList',rooms.getRoomList());
    socket.on('join',(params,callback)=>{
        var room=params.room.toLowerCase();
        if(!isRealString(params.name) || !isRealString(room)){
            return callback('Name and Room name are required');
        }

    if((users.isUsernameUnique(params.name))>0){
        return callback('Username has already taken');
    }
    rooms.addRoom(room);
        socket.join(room);


        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,room);
    io.to(room).emit('updateUserList',users.getUserList(room));

        socket.emit('newMessage',generateMessage('Admin','Welcome to the chat App'));
        socket.broadcast.to(room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
        callback();
    });


    socket.on('createMessage',(message,callback)=>{
        var user=users.getUser(socket.id);
        if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        callback();
    }

    });

    socket.on('createLocationMessage',(coords)=>{
        var user=users.getUser(socket.id);
        if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
    });
    socket.on('disconnect',()=>{
        var user=users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
            rooms.removeRoom(user.room,users.getUserList(user.room).length);
        }



    });


});
server.listen(port,()=>{
    console.log(`server has started listening on port ${port}`);
});
