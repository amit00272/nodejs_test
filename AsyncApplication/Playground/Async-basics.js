/**
 * Created by noargs on 20/06/17.
 */
console.log("Statring App");


setTimeout(()=>{

    console.log("inside of call back");
},2000);


setTimeout(()=>{

    console.log("inside of second call back");
},0);

console.log("Ending App");