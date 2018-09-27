const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const reviews = require("./controllers/reviews");
const comments = require("./controllers/comments");

if (!process.env.PORT) {
    require('dotenv').config()
}

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

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static('public'))

module.exports = app;
