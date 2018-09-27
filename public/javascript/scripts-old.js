// listen for a form submit event
document.getElementById("newComment").addEventListener("submit", e => {
    // prevent the default form behavior
    e.preventDefault();
    console.log("made it past prevent default")
    // serialize the form data into an object
    let comment = {};
    const inputs = document.getElementsByClassName('form-control');
    for (var i = 0; i < inputs.length; i++) {
      comment[inputs[i].name] = inputs[i].value;
    }

    // use axios to initialize a post request and send in the form data

    // axios.post('/user', comment)
    //   .then(function (response) {
    //     // wait for the success response from the server
    //     console.log("Miraculously, this code ran.")
    //     console.log(response);
    //     // remove the information from the form
    //     this.reset();
    //     // display the data as a new comment on the page
    //     document.getElementById('comments').prepend(
    //       `
    //        <div class="card">
    //          <div class="card-block">
    //            <h4 class="card-title">${response.title}</h4>
    //            <p class="card-text">${response.content}</p>
    //            <p>
    //               <form method="POST" action="/reviews/comments/${response._id}?_method=DELETE">
    //                 <button class="btn btn-link" type="submit">Delete</button>
    //               </form>
    //            </p>
    //          </div>
    //        </div>
    //       `
    //     );
    //   })

    axios.post('/reviews/comments', comment)
      .then(function (httpResponse) {
          var newElement = `
          <div class="card">
            <div class="card-block">
              <p>This comment's ID is ${httpResponse.data.comment._id}</p>
              <h4 class="card-title">${httpResponse.data.comment.title}</h4>
              <p class="card-text">${httpResponse.data.comment.content}</p>
              <p>
                 <form method="POST" action="/reviews/comments/${httpResponse.data.comment._id}?_method=DELETE">
                   <button class="btn btn-link" type="submit">Delete</button>
                 </form>
              </p>
            </div>
          </div>
         `;
        //  console.log(newElement);
        document.getElementById('comments').prepend($.parseHTML(newElement));
        // wait for the success response from the server
        console.log(httpResponse.data.comment._id);
        // remove the information from the form
        // display the data as a new comment on the page
      })
      .catch(function (error) {
        console.log(error);
        // handle any errors
        alert('There was a problem saving your comment. Please try again.')
      });
});