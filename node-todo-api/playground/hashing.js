const {SHA256}=require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt=require('bcryptjs');

var password ='123abc!';

bcrypt.genSalt(10,(error,saltVal)=>{

    bcrypt.hash(password,saltVal,(err,hash)=>{

        //console.log(hash);
    });

});

var hashedPassword='$2a$10$kls.Avpu0Tk.pWYEWsKlxOx9xnNjZK28WvF1ebFFT1u3IVRL32M6C';

bcrypt.compare(password,hashedPassword,(error,res)=>{

   console.log(res);

});

var data ={
    id:10
};

var token=jwt.sign(data,'123abc');

//console.log(token);

var jwtdecoded=jwt.verify(token,'123abc');
//console.log(jwtdecoded);



/*
var message='amit00272';
var hash= SHA256(message).toString();

var message1='amit00272';
var hash1= SHA256(message1).toString();

console.log(`Message : ${message}`);
console.log(`Message After Hashing :${hash}`);


console.log(`Message: ${message1}`);
console.log(`Hash: ${hash1}`);

var data ={
  id:4
};

var token={

    data,
    hash:SHA256(JSON.stringify(data)+'somes').toString()
}


var resultHash=SHA256(JSON.stringify(token.data)+'somes').toString()

if(resultHash==token.hash){

    console.log("Data is unchanged");

}else{


    console.log("Data was changed .PLease don't trust");
}*/