const request = require('request')

const weatherStack = (lat, lon, callback) =>{
    const urlWeather = `http://api.weatherstack.com/current?access_key=385c0fe32e09b6a83c8a5cfd39ab601e&query=${lon},${lat}&units=m`
    request({url:urlWeather, json:true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(response.body.error){
            callback('unable to find location', undefined)
        }else{
            const {body:{location, current}} = response
            callback(undefined, {
                temperature: current.temperature,
                weather_descriptions: current.weather_descriptions[0],
                observation_time: current.observation_time,
                wind_speed: current.wind_speed,
                precip: current.precip,
                humidity: current.humidity

            })
        }
    })
}


module.exports = weatherStack