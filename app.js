const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

// MODELS
const Review = mongoose.model('Review', {
    title: String
  });

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review" },
    { title: "Next Review" }
  ]

  app.get('/reviews', (req, res) => {
    
    res.render('reviews-index', { reviews: reviews });
  })