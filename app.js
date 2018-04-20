const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=house%20no.%2015%20sector%202c%20gurgaon%20haryana%20india',
    json: true
},(error, response, body)=>{
    console.log(body);
});