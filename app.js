const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// MONGOOSE STUFF
var mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("\ndatabase connected\n")
});

//Define a schema
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    title: String
});

var Review = mongoose.model('Review', reviewSchema );

var dummy = new Review({title: "dummy review"})

dummy.save(function (err, dummy){
  if (err) return console.error(err);
  console.log(dummy)
})

// INDEX
app.get('/', (req, res) => {
  console.log("request at /")
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
      console.log("I ran")
    })
})

app.get('/add-dummy-review', (req, res) => {
  console.log("request at /add-dummy-review")
  res.send("hello")
});

app.listen(3000, () => {
  console.log('App listening on port 3000!')
  var dummy = new Review({title: "dummy review"})
  console.log(dummy);
  dummy.save(function (err, dummy){
    console.log("and this far");
    if (err) return console.error(err);
    console.log(dummy)
  })
  console.log("made it this far")
})

// OUR MOCK ARRAY OF PROJECTS
// let reviews = [
//     { title: "Great Review" },
//     { title: "Next Review" }
//   ]

  // app.get('/reviews', (req, res) => {
    
  //   res.render('reviews-index', { reviews: reviews });
  // })