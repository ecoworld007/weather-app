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
.default('address',"delhi")
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address)
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