var env = process.env.NODE_ENV || 'development';
console.log("env*******"+env);
if(env === 'development'){

    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp'

}else if(env === 'test'){

    process.env.PORT=3000;
    process.env.MONGODB_URI='mongodb://localhost:27017/TodoApptest'


}





var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose}=require('./db/db');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const _=require('lodash');

var app=express();

const port=process.env.PORT;

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

    var todo =new Todo({
        text:req.body.text
    });

    todo.save().then((data)=>{

        console.log("Data inserted");
         res.send(data);
    },(e)=>{

        res.status(400).send(e);
    })
});


app.get('/todos',(req,res)=>{

Todo.find().then((todos)=>{
    res.send({todos});

},(e)=>{
res.sendStatus(400).send(e);
});
});

app.get('/todos/:id',(req,res)=>{

       var id=req.params.id;
       if(!ObjectID.isValid(id))
           return res.sendStatus(404).send();

         Todo.findById(id).then((todo)=>{

             if(!todo)
                return res.sendStatus(404);

             res.send({todo});

           }).catch((error)=>res.sendStatus(400).send({error}));


});

app.get('/todos/delete/:id',(req,res)=>{

    var id=req.params.id;
    if(!ObjectID.isValid(id))
        return res.sendStatus(404).send();

    Todo.findByIdAndRemove(id).then((todo)=>{

        if(!todo)
            return res.sendStatus(404);

        res.send({todo});

    }).catch((error)=>res.sendStatus(400).send({error}));


});



app.patch('/todos/:id', (req, res) => {
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

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo)
            return res.status(404).send();
        res.send({todo});

        })
        .catch((error)=>res.sendStatus(400).send({error}));


});


app.listen(port,()=>{

     console.log(`Started on port ${port}`);
});



module.exports={app};
