const request = require('request');
let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${process.env.GOOGLE_MAP_API_KEY}`,
            json: true
        },(error, response, body)=>{
            if(error){
                reject('Unable to connect to server');
            }else if(response.statusCode === 200 && body.status == 'OK'){
                let result = {
                    address: body.results[0].formatted_address,
                    location: body.results[0].geometry.location
                }
                resolve(result);
            }else if(body.status === 'ZERO_RESULTS'){
                reject('No place found corressponding to the address provided');
            }else{
                reject(`Something bad happened with error message: ${body.status}`);
            }
        });
    });
}

module.exports={
    geocodeAddress
}