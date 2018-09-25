const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {

  // VIEW CREATE FORM
  app.get('/movies/:movieId/reviews/new', (req, res) => {
      res.render('reviews-new', { movieId: req.params.movieId });
      console.log(req.params.movieId);
    })

    // VIEW REVIEWS INDEX
  app.get('/reviews', (req, res) => {
      Review.find( function(err, reviews) {
        res.render('reviews-index', {reviews: reviews});
      })
    })
    
  // EDIT ONE REVIEW
  app.get('/reviews/:id/edit', function (req, res) {
      Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
      })
    })
    
  // SHOW
  app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
      Comment.find({reviewId: req.params.id}).then((comments) => {
        console.log(review)
        console.log(comments)
        res.render('reviews-show', { review: review, comments: comments })
      })
    }).catch((err) => {
      console.log(err.message);
    })
  })
    
  // UPDATE
  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then(review => {
        res.redirect(`/reviews/${review._id}`)
      })
      .catch(err => {
        console.log(err.message)
      })
  })
    
  // DELETE
  app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
      res.redirect('/');
    }).catch((err) => {
      console.log(err.message);
    })
  })
    
  // CREATE
  app.post('/reviews', (req, res) => {
    // req.body needs to contain MovieId
    console.log(req.body);
    Review.create(req.body)
        .then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        })
        .catch((err) => {
            console.log(err.message)
    })
  });
}