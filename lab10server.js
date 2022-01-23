'use strict';


const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 3002;


const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movie.js');

app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.listen(PORT, () => console.log(`Server up on ${PORT}`));
