/**
 * Created by noargs on 20/06/17.
 */

var asyncAdd=(a,b)=>{


  return new Promise((resolve,reject)=>{

      setTimeout(()=>{

          if(typeof a === 'number' && typeof b === 'number')
              resolve(a+b);
          else
              reject("Input is not valid");
      },1500);

  });

};


asyncAdd(10,10).then((result)=>{
     console.log(result);
    return asyncAdd(result,20);

}).then((result)=>{
console.log("Res"+result);

}).catch((error)=>{

    console.log(error);

});