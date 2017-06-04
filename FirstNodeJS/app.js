console.log("Start App");

const fs= require("fs");
const os =require("os");
//1 way to concat the string
//var str="Hello Mr. "+os.userInfo().username+"\n";
//2 otherway to concat the string using templete string
var str= `Hello ! ${os.userInfo().username}`;

fs.appendFile("greet.txt",str);