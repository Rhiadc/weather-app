const request = require('request')

const geocode = (adress, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(adress)}.json?access_token=pk.eyJ1Ijoid2hvNDAwNCIsImEiOiJja25tM3lsdWMwazZ1MnBxanNjbDVtcGo0In0.mF60cLixczbH6mQ034yuzQ&limit=1`
    request({url:url, json: true}, (error, response) =>{
        if(error){
            callback('unable to connect to location services', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Please try again', undefined)
        }else{
            const {features} = response.body
            callback(undefined, {
                lat: features[0].center[0],
                lon : features[0].center[1],
                location: features[0].place_name
            })
        }
    })
}

module.exports = geocode