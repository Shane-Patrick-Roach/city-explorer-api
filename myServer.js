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

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/myMovie.js');

app.get('/weather', getWeather);
app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`listening on port ${PORT}`));


