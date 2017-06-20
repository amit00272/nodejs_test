/**
 * Created by noargs on 20/06/17.
 */

const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const request=require('request');



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

        request({

            url:`https://api.darksky.net/forecast/a2ab26682544561d850b73c7abb1dab6/${result.latitude},${result.longitude}`,
            json:true

        },(error, response, data)=> {

            if (error) return;
            console.log(JSON.stringify(data.currently.temperature,undefined,10));

            //console.log(data);
        });



    }

});


console.log("finishing app");