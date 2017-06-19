class Rooms {

    constructor(){
        this.roomsList=[];
    }

    addRoom(newRoom){
        var isRoomUnique=this.roomsList.filter((room)=>room===newRoom);

        if(isRoomUnique.length<1){
        this.roomsList.push(newRoom);
    }else{
        return;
    }
    return newRoom;
    }
    findRoom(getRoom){
        var roomName=this.roomsList.filter((room)=>room===getRoom)[0];
        return roomName;
    }

    removeRoom(room,userLength){
        var roomToRemove=this.findRoom(room);

        if(roomToRemove){
        if(userLength<1){
            this.roomsList=this.roomsList.filter((room)=>room!==roomToRemove);

            return this.roomsList;

        }else{
            return;
        }
    }
    else{
        return;
    }
    }

    getRoomList(){
        
        return this.roomsList;
    }
}


module.exports={Rooms};
