/**
 * Created by noargs on 20/06/17.
 */

var address=require('../geocode/geocode')

var addrprm=(addr)=>{

  return new Promise((resolve,reject)=>{

      address.getAddress(addr,(error,result)=>{

         if(error){

             reject(error);
         } else{

             resolve(result);
         }

      });


  });

};

addrprm("110096").then((res)=>{

    console.log(res);
},(error)=>{
    console.log(error);
})