const yargs = require('yargs');
const publicIp = require('public-ip');
const geoip = require('geoip-lite');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a:{
        demand : false,
        alias:'address',
        describe: 'given address weather to be found',
        string: true
    }
})
.default('address',"delhi")
.help()
.alias('help','h')
.argv;

let getWeatherStat = (address) => {
    geocode.geocodeAddress(address)
    .then((results) => {
        console.log(results.address);
        return  weather.getWeather(results.location.lat, results.location.lng);
    })
    .then((weatherResults) => {
        console.log(`Currently its ${weatherResults.temperature} but feels like ${weatherResults.apparentTemperature} temperature.`);
    })
    .catch((error) => {
        console.log(errormessage);
    });
}

if(argv.address){
    //fetch temperature for address provided by CLI
    getWeatherStat(argv.address);
}else{
    //checks for the ip address to find the city for which temperature is to be fetched
    publicIp.v4().then(ip => {
        return geoip.lookup(ip).city;
    }).then((address) => {
        getWeatherStat(address);
    });
}