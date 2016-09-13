var mongoose = require('mongoose');
var Post = require('./post');

// create a new schema
var UserSchema = mongoose.Schema({
  firstname: { 
    type: String, 
    required: true
  },
  lastname: { 
    type: String, 
    required: true
  },
  email: {
    type: String,
    require:true,
    unique: true
  },
  post: Post.schema
});

// tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Post' , PostSchema);