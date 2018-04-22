const request = require('request');

let getWeather = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${process.env.DARK_SKY_API_KEY}/${latitude},${longitude}`,
            json: true
        },(error, response, body) => {
            if(error){
                reject('Unable to connect to the server');
            } else if(response.statusCode === 200){
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }else{
                reject('not able to fetch temperature');
            }
        });
    });
}

module.exports = {
    getWeather
}