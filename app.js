const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
const argv = yargs.options({
    a:{
        demand : false,
        alias:'address',
        describe: 'given address weather to be found',
        string: true
    }
})
.help()
.alias('help','h')
.argv;
//added default value for address if no input is provided
let address = argv.address || 'Delhi';
geocode.geocodeAddress(address)
.then((results) => {
    console.log(results.address);
    return  weather.getWeather(results.location.lat, results.location.lng);
})
.then((weatherResults) => {
    console.log(JSON.stringify(weatherResults,undefined,2));
})
.catch((error) => {
    console.log(errormessage);
});