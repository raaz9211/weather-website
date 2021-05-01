const request = require("request")

const forecast = (longitude,latitude,callback) =>
{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${encodeURIComponent(longitude)}&lon=${encodeURIComponent(latitude)}&appid=f5da6b5015b5d0a6abff231459a3cd12`
    request({url:url,json:true},(error,response) =>{
        if(error)
            callback('Unable to connect to wether serive',undefined)
        else if(response.body.message)
            callback('Unable to find location',undefined)
        else
            callback(undefined,{
                first : `${response.body.current.weather[0].description[0].toUpperCase()}${response.body.daily[0].weather[0].description.slice(1)}. It is currently ${Math.round(response.body.current.temp - 273.15)} \xB0C degree out. There is a ${response.body.minutely[0].precipitation}% chance of rain`,
                second : `Temp : high ${Math.round(response.body.daily[0].temp.max - 273.15)} \xB0C and low ${Math.round(response.body.daily[0].temp.min - 273.15)} \xB0C `
    })
        
    })

}

module.exports = forecast