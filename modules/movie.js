'use strict';


const axios = require('axios');


async function getMovies(request, response) {
  try{let location = request.query.location;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${location}`;

    const movieData = await axios.get(url);

    let groomedMovies = movieData.data.results.map(movie => new Movie (movie));
    
    response.send(groomedMovies);}
  
  catch(error){response.send('error');}
}



class Movie {
  constructor(movie){
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path:'';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

module.exports = getMovies;
