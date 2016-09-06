var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var routes = require('./config/routes');

// tell express to use ejs for rendering templates
app.set('view engine' , 'ejs');

// use express layouts middleware too
app.use(layouts);

// add the middleware that makes our POST data available in the request
app.use(bodyParser.urlencoded({ extended: false })); 

// method override let's use all the HTTP verbs with forms
app.use(methodOverride("_method"));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.listen(3000 , function(){
  console.log('listening on port 3000');
});