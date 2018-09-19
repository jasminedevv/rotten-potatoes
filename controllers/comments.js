const Comment = require('../models/comment')

module.exports = (app) => {

    // NEW
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body)
        .then(comment => {
            console.log(comment);
            console.log(comment.reviewId);
          res.redirect(`/reviews/${comment.reviewId._id}`);
        }).catch((err) => {
          console.log(err.message);
        });
      });

    // DELETE
    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
        res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
        console.log(err.message);
        })
    })
  }