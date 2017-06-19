const expect=require('expect');

const {Rooms}=require('./rooms');

describe('Rooms',()=>{
var rooms;

beforeEach(()=>{
    rooms=new Rooms();
    rooms.roomsList=['arun','Kayathi','kumar'];
});
it('should add rooms',()=>{
    var newRoom='reddy';
    var addedRoom=rooms.addRoom(newRoom);
    expect(addedRoom).toBe(newRoom);

}) ;
it('Should remove room',()=>{
    var room='arun';
    var userListLength=0;
    removedRoom=rooms.removeRoom(room,0);
     expect(removedRoom.length).toBe(2);
     expect(removedRoom).toNotBe(room)
});
it('should display rooms',()=>{
    var rooms=rooms.getRoomList();
    expect(rooms).toEqual(rooms.roomsList);

});
});
