var mongoose = require('mongoose');

// create a new schema
var PostSchema = mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    unique: true,
    minlength: 3
  },
  body: { 
    type: String, 
    required: true,
    maxlength: 1000,
    validate: {
      validator: function(value) {

          // list of naughty words
          var banned_words = ['wombat' , 'sparta' , 'bob'];

          // check for each banned word in the body text
          var word = null;
          while(word = banned_words.pop()) {
            if(value.indexOf(word) !== -1) 
              return false;
          }
          
          // none were found, you passed!
          return true; 
      },
      message: 'No rude words please!'
    }
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  }
});

// tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Post' , PostSchema);