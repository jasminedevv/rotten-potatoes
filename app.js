const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const reviews = require("./controllers/reviews");
const comments = require("./controllers/comments");
const movies = require("./controllers/movies");
const Review = require('./models/review');
const Comment = require('./models/comment');

const exphbs = require('express-handlebars');

app.use(methodOverride('_method'))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// MONGOOSE STUFF
const mongoose = require('mongoose');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");
})
.catch( err => {
    throw err;
})

// REVIEWS ROUTE
reviews(app)
comments(app)
movies(app)

// HOME ROUTE
// app.get('/', (req, res) => {
//   Review.find()
//       .then(reviews => {
//           res.render('reviews-index', {reviews: reviews});
//       })
//       .catch(err => {
//           console.log(err);
//           res.send("this app is broken :( <br><br><a href=\"https://www.youtube.com/watch?v=yD2FSwTy2lw\">no one\'s around to help</a>");
//       });
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static('public'))

module.exports = app;
