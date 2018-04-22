const yargs = require('yargs');
const geocode = require('./geocode/geocode')
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
        console.log(JSON.stringify(results,undefined,2));
    }
});