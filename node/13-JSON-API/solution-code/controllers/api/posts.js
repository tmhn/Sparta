var Post = require('../../models/post');


// INDEX - GET /
function indexPost(req , res) {

  // get the model to load all the posts. wait for data in the callback
  Post.find({} , function(err, posts) {

  // check for errors and return 500 error and message if found
  if(err) return res.status(500).send(err);

  // render the object as JSON
  res.json(posts);

  });

}

// SHOW - GET /:id
function showPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
    
    
      // check for errors or for no object found
      if(!post) return res.status(404).send("Not found");
     if(err) return res.status(500).send(err);
  
      // render the object as JSON
      res.json(post);
  
  
  });

}


// DELETE - DELETE /:id
function deletePost(req , res) {

  // tell the data store to remove the post with the id in the request
  Post.findByIdAndRemove(req.params.id , function(err) {
  
      // check for errors and return 500 if there was a problem
       if(err) res.status(500).json({error: err.message});
  
      // redirect to a GET request
      res.status(204).json(); // 204 - no content
  
  });
  
}

// UPDATE - UPDATE /:id
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( 
        req.params.id, 
        { $set:  req.body }, 
        { runValidators: true, new:true }, 
        function(err , post){
      
          // check for errors and return 500 if there was a problem
          if(err) res.status(500).json({error: err.message});
          
          // return the object
          res.json(post);
    
        }
    );

}


// CREATE - POST /
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) res.status(500).json({error: err.message});
  
    // return the object
    res.json(post);
  
  });

}



// export all our controller functions in an object
module.exports = {

  index:indexPost,
  show: showPost,
  delete: deletePost,
  update: updatePost,
  create: createPost

}