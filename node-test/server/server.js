const express =require('express');

var app=express();


app.get('/',(req,res)=>{

    res.send("Hello World");
});

app.get('/users',(req,res)=>{

    res.send([{name:"Amit"}]);
});

app.listen('3000');

module.exports.app=app;