const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
const port =process.env.PORT || 3000 ;

hbs.registerPartials(__dirname+'/views/partials');
app.set("view engine",hbs);


app.use((req,res,next)=>{

    fs.writeFileSync("server.log",`User Access at ${new Date()} with Url ${req.path}`);
    next();
});


app.use(express.static(__dirname+'/public'));
hbs.registerHelper("currentYear",()=> new Date().getFullYear());

app.get('/',(req,res)=>{

    res.render("home.hbs",{
        pageName:"Noargs",
        pageTitle:"Noargs"

    });
});

app.get('/about',(req,res)=>{

    res.render("about.hbs",{
        pageName:"About",
        pageTitle:"About page title"

    });
});

app.get('/bad',(req,res)=>{

    res.send({
        error:'Bad request'
    });
});
app.listen(port,()=>{

    console.log("server started on port 3000")

});