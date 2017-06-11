var expect=require('expect');

var {generateMessage,generateLocationMessage}=require('./message');

describe('newMessage',()=>{

    it('Should create a correct message object',()=>{
        var from="Arun";
        var text="Hi this is a new message";
        var createdAt=123;
        var message=generateMessage(from,text);
        expect(message).toInclude({
            from,text
        });
        expect(message.createdAt).toNotBeA('number');
    });
});

describe('newLocationMessage',()=>{
    it('Should create a correct location object',()=>{
        var from="admin";
        var latitude=14;
        var longitude=30;
        var url="https://www.google.com/maps?q=14,30";
        var locationMessage=generateLocationMessage(from,latitude,longitude);
        expect(locationMessage.createdAt).toBeA('number');
        expect(locationMessage).toInclude({
            from,url
        });
    });
});
