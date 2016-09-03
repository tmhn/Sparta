  var Post = require('../models/post');


  // INDEX - GET /
  function indexPost(req , res) {

    res.render("posts/index" , {
      title: "Posts",
      posts: Post.all()
    });

  }

  // SHOW - GET /:id
  function showPost(req , res) {

    res.render("posts/show" , {
      title: "Post",
      post: Post.find(req.params.id)
    });

  }

  // EDIT - GET /:id/edit
  function editPost(req , res) {

    res.render("posts/edit" , {
      title: "Post Edit",
      post: Post.find(req.params.id)
    });

  }

  // NEW - GET /new
  function newPost(req , res) {

    res.render("posts/new" , {
      title: "New Post",
      post: {}
    });

  }

  // DELETE - DELETE /:id
  function deletePost(req , res) {

    // save to our data store
    Post.delete(req.params.id);
    
    // now redirect to the homepage
    res.redirect("/");

  }

  // UPDATE - UPDATE /:id
  function updatePost(req , res) {

    // create a new post object from the posted data
    var post = {
      id: req.params.id,
      title: req.body.title,
      body: req.body.body
    }

    // save to our data store
    Post.update(req.params.id , post);
    
    // now redirect to the homepage
    res.redirect("/");

  }

  // CREATE - POST /
  function createPost(req , res) {

    // create a new post object from the posted data
    var post = {
      title: req.body.title,
      body: req.body.body
    }

    // save to our data store
    Post.create(post);
    
    // now redirect to the homepage
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