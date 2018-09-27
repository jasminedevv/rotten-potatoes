const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(process.env.MOVIE_DB_KEY);
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {

    app.get('/movies/:id', (req, res) => {
        console.log(process.env.MOVIE_DB_KEY);
        console.log("Attempting to get movie detail from moviedb...");
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            console.log("Success!");
            console.log("Now looking up reviews in local db...");
          Review.find({ movieId: req.params.id }).then(reviews => {
              console.log("\nReviews successfully fetched:\n");
              console.log(reviews)
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