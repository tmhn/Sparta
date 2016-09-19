var mongoose = require('mongoose');

// get a reference to the mongoose Schema type
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({

  first_name : {type: String, required:true},
  last_name : {type: String, required:true},
  email : {type: String, required:true},
  password : {type: String, required:true},
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

});

module.exports = mongoose.model('User' , UserSchema);