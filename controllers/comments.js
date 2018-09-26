const Comment = require('../models/comment')

module.exports = (app) => {
// CREATE Comment
    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        console.log("comment registered with content: "  ,req.body);
        res.status(200).send({ comment: comment });
        console.log("I have responded with content: ", comment);
      }).catch((err) => {
        res.status(400).send({ err: err })
      })
    })

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