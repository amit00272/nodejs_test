/**
 * Created by noargs on 20/06/17.
 */

const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');



const argv = yargs
    .options({

        a:{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather forcast',
            string:true
        }

    })
    .help()
    .alias('help','h')
    .argv;


geocode.getAddress(argv.address,(errorMessage,result)=>{

    if(errorMessage){
        console.log(errorMessage);
    }else{

     console.log(`Address:-${result.address}`) ;
     weather.getWeather(result.latitude,result.longitude,(error,result)=>{

          console.log(`Temperature is ${result.temperature}`);

    });


    }

});


console.log("finishing app");