User.find()
    .then(users => {
        
    })
    .catch(err => {

    })

Article.findById(articleId)
    .then(article => {

    })
    .catch(err => {
        console.log("error")
    })

User.findOne(ssn : "444")
    .then(user => {

    })
    .catch(err => {

    })
// model is uppercase singular
// array of values lowercase singular
// 