const request = require('request');
let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    },(error, response, body)=>{
        if(error){
            callback('Unable to connect to server');
        }else if(response.statusCode === 200 && body.status == 'OK'){
            let result = {
                address: body.results[0].formatted_address,
                location: body.results[0].geometry.location
            }
            callback(undefined, result);
        }else if(body.status === 'ZERO_RESULTS'){
            callback('No place found corressponding to the address provided');
        }else{
            callback(`Something bad happened with error message: ${body.status}`);
        }
    });
}

module.exports={
    geocodeAddress
}