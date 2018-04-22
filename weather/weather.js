const request = require('request');

let getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`,
        json: true
    },(error, response, body) => {
        if(error){
            callback('Unable to connect to the server');
        } else if(response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }else{
            callback('not able to fetch temperature');
        }
    })
}

module.exports = {
    getWeather
}