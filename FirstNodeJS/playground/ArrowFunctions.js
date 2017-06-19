/**
 * Created by noargs on 19/06/17.
 */

/*
var square =(x)=>{

    var result=x*x;
    return result;
};
*/
var square=x=> x*x;

var user={
    name:'Amit',
    sayHi:()=>{
        console.log(arguments);
        console.log(`hi,I am ${this.name}`);//this is not work here
    },
    sayHiAlt(){
        console.log(arguments);
        console.log(`hi,I am ${this.name}`);

    }

};

user.sayHi(1,2,3);