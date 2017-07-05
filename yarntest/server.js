const express = require('express');
const port =process.env.PORT || 3000;

let app = express();

app.get('/',(req,res)=>{

   res.send("This is my yarn project");
});


app.listen(port,()=>{

   console.log(`Server is fired up on ${port}`)
});

