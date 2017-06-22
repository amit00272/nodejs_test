var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/db');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');


var app=express();

app.use(bodyParser.json());
//app.post('',(req,res)=>{})

app.post('/todos',(req,res)=>{


});

app.listen(3000,()=>{

     console.log('Started on port 3000');
});




