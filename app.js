const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const exphbs = require('express-handlebars');

app.use(methodOverride('_method'))

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

// EDIT
app.get('/reviews/:id/edit', function (req, res) {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
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
