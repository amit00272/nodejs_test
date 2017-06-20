/**
 * Created by noargs on 20/06/17.
 */

var getUser=(id,callback)=>{

var user={
    id,
    name:"Amit"
};

setTimeout(()=>{

    callback(user);
},3000);

};


getUser(31,(user)=>{


   console.log(user)
});