const yargs = require('yargs');
const axios = require('axios');
const publicIp = require('public-ip')
const geoip = require('geoip-lite')

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

let getWeatherStat = (address) => {
    console.log(address);
    let encodedAddress = encodeURIComponent(address);
    let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAP_API_KEY}`;
    axios.get(geocodeUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.');
        }
        console.log(response.data.results[0].formatted_address);
        let lat = response.data.results[0].geometry.location.lat;
        let lng = response.data.results[0].geometry.location.lng;
        let weatherUrl = `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${lat},${lng}`;
        return axios.get(weatherUrl);
    }).then((weatherResults) => {
        console.log(`Currently its ${weatherResults.data.currently.temperature} but feels like ${weatherResults.data.currently.apparentTemperature} temperature.`);
    },(error) => {
        throw new Error('Unable to fetch temperature for that address');
    }).catch((error) => {
        if(error.code === 'ENOTFOUND'){
            console.log('Unable to connect to API server');
        }else{
            console.log(error.message);
        }
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
