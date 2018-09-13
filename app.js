const express = require('express')
const app = express()
const bodyParser = require('body-parser');

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE STUFF
const mongoose = require('mongoose');

// Copied this from Raymond's project
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");
})
.catch( err => {
    throw err;
})

//Define a schema
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

// INDEX

app.get('/', (req, res) => {
  Review.find()
      .then(reviews => {
          res.render('reviews-index', {reviews: reviews})
      })
      .catch(err => {
          console.log(err)
      })
  //res.render('home', {msg: 'Hello World!'});
});

app.get('/add-dummy-review', (req, res) => {
  console.log("request at /add-dummy-review")
  res.send("hello")
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
})

//add
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.post('/reviews', (req, res) => {
  Review.create(req.body)
      .then((review) => {
          //console.log(review);
          res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
          console.log(err.message)
  })
});
