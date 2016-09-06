var express = require('express');
var app = express();
var routes = require('./config/routes');

// add the router
app.use(routes);

app.listen(3000 , function(){
  console.log('app is listening on port 3000');
});