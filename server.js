'use strict';



//importing express - we need this because its an Express server
const express = require('express');

// how we use express as per the docs
const app = express();

// must import dotenv before using process.env.PORT
require('dotenv').config();

// use the port we want locally, and make this deployable
const PORT = process.env.PORT || 3002;

//must import cors to use it
var cors = require('cors');
// must USE cors to hit server from other apps
app.use(cors());

//import weather data from json
//const weatherData = require('./data/weather.json');

const axios = require('axios');


app.get('/weather', getWeather);
app.get('/movies', getMovies);

async function getWeather(request, response) {

  //let searchQuery = request.query.searchQuery;
  let lat = request.query.lat;
  let lon = request.query.lon;

  //console.log(lat,lon);
  //console.log(searchQuery);

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`;

  const weatherData = await axios.get(url);
  

  // let filteredCity = weatherData.filter(cityweather => cityweather.city_name === searchQuery);


  //console.log(weatherData.data.data);

  let groomedWeather = weatherData.data.data.map(day => new Forecast (day));

  
  //console.log(weatherData.data[0]);

  response.send(groomedWeather);
}

async function getMovies(request, response) {
  let location = request.query.location;

  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

  const movieData = await axios.get(url);


  let groomedMovies = movieData.data.results.map(movie => new Movie (movie));

  console.log(groomedMovies);

  response.send(groomedMovies);
}



class Forecast {
  constructor(day){
    this.lowTemp = day.low_temp;
    this.maxTemp = day.max_temp;
    this.description = day.weather.description;
    this.date = day.valid_date;
  }
}

class Movie {
  constructor(movie){
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


