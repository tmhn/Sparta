
// Haven't looked at real models yet so for now we'll use this array
var posts = [{
  id: 0,
  title: "Post 1",
  body: "This is the first post"
},
{
    id: 1,
    title: "Post 2",
    body: "This is the second post"
},
{
    id: 2,
    title: "Post 3",
    body: "This is the third post"
}];



// INDEX - GET /
function indexPost(req , res) {

  res.render("posts/index" , {
    title: "Posts",
    posts: posts
  });

}

// SHOW - GET /:id
function showPost(req , res) {

  res.render("posts/show" , {
    title: "Post",
    post: posts[req.params.id]
  });

}

// EDIT - GET /:id/edit
function editPost(req , res) {

  res.render("posts/edit" , {
    title: "Edit Post",
    post: posts[req.params.id]
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

  res.send("DELETE");

}

// UPDATE - UPDATE /:id
function updatePost(req , res) {

  // data is gathered by body parser and placed in req.body
    
    // get the post object from our data store
    var post = posts[req.params.id];
    
    // update the values of the object with data from the request
    post.title = req.body.title;
    post.body = req.body.body;
    
    // save the post back to our data store ( at the spot it came from this time )
    posts[req.params.id] = post;
    
    // redirect the user to a GET route. We'll go back to the INDEX.
    res.redirect("/");

}

// CREATE - POST /
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = {
    id: posts.length,
    title: req.body.title,
    body: req.body.body
  }
  
  // store the post in our posts array
  posts.push(post);
  
  // redirect the user to a GET route. We'll go back to the INDEX.
  res.redirect("/");

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