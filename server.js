'use strict';


const { request } = require('express');
//console.log('Hello World, From our FIRST Server!!');


const express = require('express');


const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 3002;

var cors = require('cors');


const weatherData = require('./data/weather.json');



app.get('/weather', (request,response)=> {

  let searchQuery = request.query.searchQuery;
  //let lat = request.query.lat;
  //let lon = request.query.lon;

  
  console.log(searchQuery);
  let filteredCity = weatherData.filter(cityweather => cityweather.city_name === searchQuery);

  let groomedWeather = filteredCity[0].data.map(day => new Forecast (day));

  
  console.log(filteredCity[0].data[0].low_temp);

  response.send(groomedWeather);
});





class Forecast {
  constructor(day){
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
