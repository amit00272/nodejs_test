var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/db');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();

app.use(bodyParser.json());

//app.post('',(req,res)=>{})
app.post('/todos',(req,res)=>{

    var todo =new Todo({
        text:req.body.text
    });
    test

    todo.save().then((data)=>{

        console.log("Data inserted");
         res.send(data);
    },(e)=>{

        res.status(400).send(e);
    })
});


app.get('/todos',(req,res)=>{

Todo.find().then((doc)=>{
    res.send({doc});

},(e)=>{
res.sendStatus(400).send(e);
});

});

app.listen(3000,()=>{

     console.log('Started on port 3000');
});



module.exports={app};
