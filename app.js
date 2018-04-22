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

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
},(error, response, body)=>{
    if(error){
        console.log('Unable to connect to server')
        console.log(JSON.stringify(error,undefined,2));
    }else if(response.statusCode === 200 && body.status == 'OK'){
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Location: ${JSON.stringify(body.results[0].geometry.location,undefined,2)}`);
    }else if(body.status === 'ZERO_RESULTS'){
        console.log('No place found corressponding to the address provided')
    }else{
        console.log('something bad happened');
        console.log('Error message: ',body.status)
    }
});