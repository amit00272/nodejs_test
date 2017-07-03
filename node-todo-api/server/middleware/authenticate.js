/**
 * Created by noargs on 03/07/17.
 */

var {User}=require('./../models/user');
const bcrypt=require('bcryptjs');



var authenticate = (req,res,next)=>{

    var token=req.header('x-auth');

    User.findByToken(token).then((user)=>{

        if(!user) {

            return Promise.reject();

        }

        req.user=user;
        req.token=token;
        next();

    }).catch((e)=>{

        res.sendStatus(401);
    });
};


var loginAuthenticate=(req,res,next)=>{

    var email=req.body.email;
    var password=req.body.password;

    User.findOne({email}).then(user=>{

                 if(!user)
                    return Promise.reject();

                 if(bcrypt.compare(password,user.password)) {
                     req.user = user;
                     next();
                 }else{

                     return Promise.reject();

                 }

            }).catch((e)=>{

                res.sendStatus(401);

    });



}

module.exports={authenticate,loginAuthenticate};

