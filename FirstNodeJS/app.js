console.log("Start App");

const fs= require("fs");
const os =require("os");
const notes=require("./note.js");
const _=require("lodash");
//1 way to concat the string
//var str="Hello Mr. "+os.userInfo().username+"\n";
//2 otherway to concat the string using templete string
/*
var str= `Hello ! ${os.userInfo().username} .You are ${notes.age} years old.\n`;
fs.appendFile("greet.txt",str);
*/
//console.log(notes.add(10,20));
//console.log(_.isString("true"));
//console.log(_.isString(1));

var filteredArray = _.uniq(["Amita","Ravi","Amit","amit",1,3,10,1,10,'a','a']);

console.log(filteredArray);