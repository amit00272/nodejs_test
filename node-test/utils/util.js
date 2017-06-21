/**
 * Created by noargs on 21/06/17.
 */
module.exports.add=(a,b)=> a+b;
module.exports.asyncAdd=(a,b,callback)=>{

    setTimeout(()=>{

            callback(a+b);

    },1500)
}
