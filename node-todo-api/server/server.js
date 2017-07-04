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



app.patch('/todos/:id',authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    console.log(body);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({

            _id:id,
            _creator:req.user._id

        }, {$set: body}, {new: true}).then((todo) => {

                if (!todo)
                    return res.status(404).send();
                res.send({todo});

        })
        .catch((error)=>res.sendStatus(400).send({error}));


});



app.post('/users',(req,res)=>{


    var body=_.pick(req.body,['email','password']);
    var user=new User(body);



    user.save().then((user)=>{

        return user.generateAuthToken();

    }).then((token)=>{

        res.header('x-auth',token).send(user);

    }).catch((error)=>res.sendStatus(400));

});




app.get('/users/me',authenticate,(req,res)=>{

        res.send(req.user);
});



/*app.post('/user/login',loginAuthenticate,(req,res)=>{
    res.send(req.user);
});*/


app.post('/user/login',(req,res)=>{

    var body=_.pick(req.body,['email','password']);

    User.findByCredentials(body.email,body.password)
        .then((user)=>{

            return user.generateAuthToken().then(token=>{

                    res.header('x-auth',token).send(user);

            });
        })
        .catch((e)=>{
            res.sendStatus(400).send();
        });
});



app.delete('/users/me/token',authenticate,(req,res)=>{

   req.user.removeToken(req.token).then(()=>{

       res.send();

       },()=>{

       res.sendStatus(400).send();
   });

});


app.listen(port,()=>{

     console.log(`Started on port ${port}`);
});



module.exports={app};
