var expect=require('expect');

var {generateMessage}=require('./message');

describe('new Message created',()=>{

    it('Should return from and text fields as it is entered',()=>{
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
