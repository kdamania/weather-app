const request = require('request')


const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=e597a0f30907ca90e6c84dcb9cb5ad23&query=" + latitude +"," + longitude + "&units=m" 

    request ({url, json: true}, (error,{body}={})=>{
        if (error){
            callback('Unable to connect to the location services!', undefined)

        }else if (body.error){
            callback("Unable to fetch location, please retry search",undefined )
        }else {
            callback(undefined,{
                currentTemperature: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity,
                precipitation: body.current.precip
            })
        }
    })
}
module.exports = forecast