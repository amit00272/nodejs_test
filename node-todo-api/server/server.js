require('./config/config');




var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose}=require('./db/db');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const _=require('lodash');
var {authenticate,loginAuthenticate}=require('./middleware/authenticate');


var app=express();

const port=process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{

    var todo =new Todo({
        text:req.body.text,
        _creator:req.user._id
    });

    todo.save().then((data)=>{

        console.log("Data inserted");
         res.send(data);
    },(e)=>{

        res.status(400).send(e);
    })
});


app.get('/todos',authenticate,(req,res)=>{

    Todo.find({
            _creator:req.user._id
        }).then((todos)=>{

                res.send({todos});
        },(e)=>{
                res.sendStatus(400).send(e);
        });
    });

app.get('/todos/:id',authenticate,(req,res)=>{

       var id=req.params.id;
       if(!ObjectID.isValid(id))
           return res.sendStatus(404).send();

         Todo.findOne({

             _id:id,
             _creator:req.user._id

         }).then((todo)=>{

             if(!todo)
                return res.sendStatus(404);

             res.send({todo});

           }).catch((error)=>res.sendStatus(400).send({error}));


});

app.get('/todos/delete/:id',authenticate,(req,res)=>{

    var id=req.params.id;
    if(!ObjectID.isValid(id))
        return res.sendStatus(404).send();

    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id

    }).then((todo)=>{

        if(!todo)
            return res.sendStatus(404);

        res.send({todo});

    }).catch((error)=>res.sendStatus(400).send({error}));


});



app.patch('/todos/:id',authenticate, async (req, res) => {

    try{

        var id = req.params.id;
        var body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.status(404).send();
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        const todo=await Todo.findOneAndUpdate({_id:id, _creator:req.user._id},
                                         {$set: body}, {new: true});
        if (!todo)
            return res.status(404).send();
        res.send({todo});



    }catch(e){

        res.sendStatus(400).send()
    }

});



app.post('/users',async (req,res)=>{

    try{
        var body=_.pick(req.body,['email','password']);
        var user=await new User(body).save();
        var token=await user.generateAuthToken();
        res.header('x-auth',token).send(user);
    }catch(e){

        res.sendStatus(400);
    }

});




app.get('/users/me',authenticate,(req,res)=>{

        res.send(req.user);
});



/*app.post('/user/login',loginAuthenticate,(req,res)=>{
    res.send(req.user);
});*/


app.post('/user/login',async (req,res)=>{

   try{

        const  body=_.pick(req.body,['email','password']);
        const  user=await User.findByCredentials(body.email,body.password);
        const token=await user.generateAuthToken();
        res.header('x-auth',token).send(user);

    }catch(e){
        res.sendStatus(400).send();
    }


});



app.delete('/users/me/token',authenticate,async (req,res)=>{

    try{

        await   req.user.removeToken(req.token);
                res.sendStatus(200).send();
    }catch(e){

        res.sendStatus(400).send();
    }

});


app.listen(port,()=>{

     console.log(`Started on port ${port}`);
});



module.exports={app};
