


class  Users{
    constructor (){
        this.usersList=[];
    }
    addUser( id, name, room){
        var user={id,name,room};
        this.usersList.push(user);
        return user;
    }
    removeUser(id){
        var user=this.getUser(id);
        if(user){
        var newUsers=this.usersList.filter((user)=>user.id!==id);
        this.usersList=newUsers;
    }
    return user;

    }
    getUser(id){
        var user=this.usersList.filter((user)=>user.id===id);
        return user[0];

    }
    getUserList(room){
        var users=this.usersList.filter((user)=>{
            return user.room===room;
        });
        var namesArray=users.map((user)=>user.name);
        return namesArray;
    }
}


module.exports={Users};
