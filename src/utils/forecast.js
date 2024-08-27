const request = require('request')



const forecast = (lat, long, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=fa9334ddac62182c3c0179a13f3cf1fd&query=${lat},${long}&units=m`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback(`Unable to find location. Try another search`, undefined)
    } else {
      callback(undefined, `Temperature is ${body.current.temperature}. It feels like ${body.current.feelslike}`)
    }
  })
}

module.exports = forecast