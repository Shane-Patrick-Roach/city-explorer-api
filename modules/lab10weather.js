'use strict';

const axios = require('axios');

let cache = { };


function getWeather(request, response) {

  let lat = request.query.lat;
  let lon = request.query.lon;

  let key = 'weather' + lat + lon;
  

  if (cache[key] && Date.now() - cache[key].timestamp < (1000 * 1000)) {
    console.log('Cache hit');
    response.send(cache[key].data);
  } else {
    console.log('Cache miss');
    

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;


    axios.get(url)
      .then(weatherData => {
        let weatherSummaries = parseWeather(weatherData);
        //console.log(weatherSummaries);
        cache[key] = {
          timestamp: Date.now(),
          data: weatherSummaries
        };
        //console.log(cache);
  
        return weatherSummaries;
      })
      .then(weatherSummaries => response.send(weatherSummaries))
      .catch(err => console.error(err));
  }

}


function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}


module.exports = getWeather;
