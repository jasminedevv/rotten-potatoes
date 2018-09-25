const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb('4765a9a8b4beb9c427e85907d8e55108');
const Review = require('../models/review');
const Comment = require('../models/comment');


module.exports = (app) => {

    // app.get('/movies/:id', (req, res) => {
    //     console.log("Attempting to get movie detail from moviedb...");
    //     moviedb.movieInfo({ id: req.params.id }).then(
    //         response => {
    //             console.log("SUccess getting movie detail. Here is the response:\n", response)
    //             res.render('movies-detail', { movie: response});
    //         }).catch(console.error)
    // });
    // I have now learned to never delete my working code when this tutorial tells me to

    app.get('/movies/:id', (req, res) => {
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