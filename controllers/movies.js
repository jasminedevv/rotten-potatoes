const MovieDb = require('moviedb-promise');
const moviedb = new MovieDb(process.env.MOVIE_DB_KEY);
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {

    // ROUTE : SHOW
app.get('/movies/:id', (req, res) => {
    moviedb.movieInfo({ id: req.params.id }).then(movie => {
      moviedb.movieTrailers({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.youtube[0].source
        console.log('VIDEOS.TRAILER_YOUTUBE_ID', videos.trailer_youtube_id)
        renderTemplate(movie)
      });
  
      function renderTemplate(movie)  {
        res.render('movies-detail', { movie: movie });
      }
    }).catch(console.error)
  });

    // app.get('/movies/:id', (req, res) => {
    //     moviedb.movieInfo({ id: req.params.id })
    //     .then(movie => {
    //       Review.find({ movieId: req.params.id })
    //       .then(reviews => {
    //           console.log(movie.base_url + movie.backdrop_path);
    //         res.render('movies-detail', { reviews: reviews, movie: movie });
    //       })
    //     }).catch(console.error)
    //   })
    
    app.get('/', (req, res) => {
        console.log("Now attempting to contact movieDB...");
        moviedb.miscNowPlayingMovies().then(response => {
            console.log("Successfully connected to movieDB!");
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    });

}