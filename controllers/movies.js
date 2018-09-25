const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('4765a9a8b4beb9c427e85907d8e55108')


module.exports = (app) => {

    app.get('/movies/:id', (req, res) => {
        console.log("Attempting to get movie detail from moviedb...");
        moviedb.movieInfo({ id: req.params.id }).then(
            response => {
                console.log("SUccess getting movie detail. Here is the response:\n", response)
                res.render('movies-detail', { movie: response});
            }).catch(console.error)
    });
    
    app.get('/', (req, res) => {
        console.log("Now attempting to contact movieDB...");
        moviedb.miscNowPlayingMovies().then(response => {
            console.log("Successfully connected to movieDB!");
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    });

}