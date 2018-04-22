const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather')
const argv = yargs.options({
    a:{
        demand : true,
        alias:'address',
        describe: 'given address weather to be found',
        string: true
    }
})
.help()
.alias('help','h')
.argv;

geocode.geocodeAddress(argv.address,(errormessage, results) => {
    if(errormessage){
        console.log(errormessage);
    } else{
        console.log(results.address)
        weather.getWeather(results.location.lat, results.location.lng, (errormessage, weatherResults) => {
            if(errormessage){
                console.log(errormessage);
            } else{
                console.log(JSON.stringify(weatherResults,undefined,2));
            }
        })
    }
});

