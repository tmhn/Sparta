var express = require('express');
var app = express();

// add code here


// route middleware
app.get("/" , function(req,res,next) {

  res.send('<h1>Homepage</h1>');

});

app.listen(3000 , function(){
  console.log('app running on port 3000');
});