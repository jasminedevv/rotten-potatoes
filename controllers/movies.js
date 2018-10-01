const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(process.env.MOVIE_DB_KEY);
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id })
        .then(movie => {
          Review.find({ movieId: req.params.id })
          .then(reviews => {
              console.log(movie.base_url + movie.backdrop_path);
            res.render('movies-detail', { reviews: reviews, movie: movie });
          })
        }).catch(console.error)
      })
    
    app.get('/', (req, res) => {
        console.log("Now attempting to contact movieDB...");
        moviedb.miscNowPlayingMovies().then(response => {
            console.log("Successfully connected to movieDB!");
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    });

}