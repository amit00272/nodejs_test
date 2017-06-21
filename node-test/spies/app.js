
var db=require('./db');

module.exports.handleSignup=(email,password)=>{

    //check if email all ready exists
    db.saveUser({
        email,
        password
    });
    //send the welcome email

};

