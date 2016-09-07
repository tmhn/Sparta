
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
    title: "Edit Post"
  });

}

// NEW - GET /new
function newPost(req , res) {

  res.render("posts/new" , {
    title: "New Post"
  });

}

// DELETE - DELETE /:id
function deletePost(req , res) {

  res.send("DELETE");

}

// UPDATE - UPDATE /:id
function updatePost(req , res) {

  res.send("UPDATE");

}

// CREATE - POST /
function createPost(req , res) {

  res.send("CREATE");

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