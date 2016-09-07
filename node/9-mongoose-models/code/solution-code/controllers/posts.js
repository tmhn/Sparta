var Post = require('../models/post');


// INDEX - GET /
function indexPost(req , res) {

  // get the model to load all the posts. wait for data in the callback
  Post.find({} , function(err, posts) {

  // check for errors and return 500 error and message if found
  if(err) return res.status(500).send(err);

  // data return so now we can render
  res.render("posts/index" , {
      title: "Posts",
      posts: posts
    });

  });

}

// SHOW - GET /:id
function showPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
    
    
      // check for errors or for no object found
      if(!post) return res.status(404).send("Not found");
     if(err) return res.status(500).send(err);
  
      res.render("posts/show" , {
      title: "Post",
      post: post
    });
  
  
  });

}

// EDIT - GET /:id/edit
function editPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
    
      // check for errors or for no object found
      if(!post) return res.status(404).send("Not found");
     if(err) return res.status(500).send(err);
  
      res.render("posts/edit" , {
      title: "Post",
      post: post
    });
  
  });

}

// NEW - GET /new
function newPost(req , res) {

  // create an empty post
  var newPost = {
    id: "",
    title: "",
    body: ""
  }

  res.render("posts/new" , {
    title: "New Post",
    post: newPost
  });

}

// DELETE - DELETE /:id
function deletePost(req , res) {

  // tell the data store to remove the post with the id in the request
  Post.findByIdAndRemove(req.params.id , function(err) {
  
      // redirect to a GET request
      res.redirect("/");
  
  });
  
}

// UPDATE - UPDATE /:id
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( req.params.id , { $set:  req.body }, function(err , post){
    
        // redirect the user to a GET route. We'll go back to the INDEX.
        res.redirect("/");
    
    });

}

// CREATE - POST /
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) return res.status(500).message(err);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });

}



// export all our controller functions in an object
module.exports = {

  index:indexPost,
  show: showPost,
  edit: editPost,
  new: newPost,
  delete: deletePost,
  update: updatePost,
  create: createPost

}