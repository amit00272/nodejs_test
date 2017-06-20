const yargs=require('yargs');
const geocode=require('./geocode/geocode');
const weather=require('./weather/weather');
const axios=require('axios');


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


var encodedAddress=encodeURIComponent(argv.address);
var geocodeUrl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response)=>{

    if(response.data.status==='ZERO_RESULTS'){
        throw  new Error('Unable to find the address');
    }
    var lat=response.data.results[0].geometry.location.lat;
    var long=response.data.results[0].geometry.location.lng;
    var weatherurl=`https://api.darksky.net/forecast/a2ab26682544561d850b73c7abb1dab6/${lat},${long}`;
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherurl);
}).then((response)=>{

    console.log(`The temperature is ${response.data.currently.temperature}`);

}).catch((error)=>{

    if(error.code==='ENOTFOUND'){
        console.log('Unable to connect to api servers');
    }else {

        console.log(error.message);
    }

});

console.log("finishing app");