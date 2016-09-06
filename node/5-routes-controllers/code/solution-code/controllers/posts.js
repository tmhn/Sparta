
  // INDEX - GET /
  function indexPost(req , res) {

    res.send("INDEX");

  }

  // SHOW - GET /:id
  function showPost(req , res) {

    res.send("SHOW: " + req.params.id);

  }

  // EDIT - GET /:id/edit
  function editPost(req , res) {

    res.send("EDIT: " + req.params.id);

  }

  // NEW - GET /new
  function newPost(req , res) {

    res.send("NEW");

  }

  // DELETE - DELETE /:id
  function deletePost(req , res) {

    res.send("DELETE: " + req.params.id);

  }

  // UPDATE - UPDATE /:id
  function updatePost(req , res) {

    res.send("SHOW: " + req.params.id);

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