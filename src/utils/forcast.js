const request = require('request')

const forcast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f3837d07f7cf031e44183b1860381aa4/'
        + encodeURIComponent(latitude).toString() 
        + ',' + encodeURIComponent(longitude).toString()
        + '?units=si'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        }
        else if (body.error) {
            callback('Unable to find location', undefined)
        }
        else {
            callback(undefined, body.daily.data[0].summary + ' Temperature is ' + body.currently.temperature + ' degrees Celsius. Chance of precipitation is ' + body.currently.precipProbability + '%.')
        }
    })
}

module.exports = forcast