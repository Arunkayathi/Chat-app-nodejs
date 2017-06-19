const expect=require('expect');

const {Users}=require('./users');


describe('Users',()=>{
    var users;

    beforeEach(()=>{
        users=new Users();
        users.usersList=[{
            id:'1',
            name:'Mike',
            room:'hello'
        },{
            id:'2',
            name:'madan',
            room:'hello'
        },{
            id:'3',
            name:'Kamraj',
            room:'hello'
        }];
    });

    it('Should add new user',()=>{
        var users=new Users();
        var user={
            id:'123',
            name:'Arun',
            room:'optbatch'
        };
        var resUser=users.addUser(user.id,user.name,user.room);
        expect(users.usersList).toEqual([user]);
    });
    it('Should remove a user',()=>{
            var userId='1';
            var user=users.removeUser(userId);
            expect(user.id).toEqual(userId);
            expect(users.usersList.length).toBe(2);
    });
    it('Should not remove a user',()=>{
        var userId='6';
        var user=users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.usersList.length).toNotBe(2);
    });

    it('Should find a user',()=>{
        var user=users.getUser('2');
        expect(user.name).toEqual('madan');
    });
    it('Should not find a user',()=>{
        var user=users.getUser('4');
        expect(user).toNotExist();
    });
    it('should return user names',()=>{
        var userNames=users.getUserList('hello');

        expect(userNames).toEqual(['Mike','madan','Kamraj']);
    });
    it('Should check username is unique',()=>{
        var user1="mike1";
        var userLength=users.isUsernameUnique(user1);
        expect(userLength).toBe(0);
    });
});
