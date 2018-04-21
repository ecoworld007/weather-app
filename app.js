const request = require('request');
const yargs = require('yargs');

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

let encodedAddress = encodeURIComponent(argv.address);

console.log(encodedAddress)
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
},(error, response, body)=>{
    if(error){
        console.log(JSON.stringify(error,undefined,2));
        return;
    }
    if(response.statusCode === 200 && body.status !== 'OVER_QUERY_LIMIT'){
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Location: ${JSON.stringify(body.results[0].geometry.location,undefined,2)}`);
    }else{
        console.log('something bad happened');
    }
});