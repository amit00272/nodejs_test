/**
 * Created by noargs on 20/06/17.
 */
const request=require('request');

var getweather=(lat,long,callback)=>{
    request({

        url:`https://api.darksky.net/forecast/a2ab26682544561d850b73c7abb1dab6/${lat},${long}`,
        json:true

    },(error, response, data)=> {



        if(error){

            callback("Unable to connect to Forcast servers");

        }else if(response.statusCode===400){

            callback("Problem in fetching data");

        }else if(response.statusCode===200) {

            callback(undefined, {
                temperature:data.currently.temperature
            });
        }


    });

}

module.exports.getWeather=getweather;