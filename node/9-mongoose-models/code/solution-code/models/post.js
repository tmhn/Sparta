var mongoose = require('mongoose');

// create a new schema
var PostSchema = mongoose.Schema({
  title: String,
  body: String
});

// tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Post' , PostSchema);