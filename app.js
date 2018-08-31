const express = require('express')
const app = express()

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// INDEX
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
  })

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

// OUR MOCK ARRAY OF PROJECTS
let reviews = [
    { title: "Great Review" },
    { title: "Next Review" }
  ]