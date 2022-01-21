'use strict';

const axios = require('axios');

async function getWeather(request, response) {

  try{let lat = request.query.lat;
    let lon = request.query.lon;

    let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

    const weatherData = await axios.get(url);

    let groomedWeather = weatherData.data.data.map(day => new Forecast (day));

    response.send(groomedWeather);}

  catch(error){response.send('error');}
}


class Forecast {
  constructor(day){
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

module.exports = getWeather;
