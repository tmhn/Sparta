var express = require('express');
var app = express();

// serve static files from the public directory
app.use(express.static('public'));

// add code here
app.use(function(req,res,next){ 

 
  // get the current date 
  var now = Date.now();
  
  // log to the terminal
  console.log('Request Time: ', now);

  // add it to the request object for use in middleware further down the list
  req.date = now;

  // we're done. move on to the next middleware
  next();

});

// add a user to the request object
app.use(function(req,res,next){

  // TOPTIP: we may well load this user from a database in the future
  // req.user = {
  //   id: 1,
  //   username: "Steveyblam"
  // }

  next();

});

// check for user logged in then redirect
app.use("/login" , function(req,res,next) {
  
  // is the user logged in? no need for them to see the login page then
  if(req.user)
    res.redirect("/");
  
  next();
  
});

app.get("/logout" , function(req,res,next) {
  
  // if the user isn't logged in no point in logging them out
  if(!req.user) 
    res.redirect("/login");

  next();
  
});

app.get("/login" , function(req,res) {
  // send a response this time.
  // no more middleware after this
  res.send('<h1>Login</h1>');
});

app.get("/logout" , function(req,res) {
  // send a response this time.
  // no more middleware after this
  res.send('<h1>Logout</h1>');
});

// route middleware
app.get("/" , function(req,res,next) {

  // check to make sure we have logged in user
  if(!req.user) 
    next("User not found");

  // we can now use req.date here too
  else
    res.send('<h1>Homepage on date: ' + req.date + '</h1><p>Hi, ' + req.user.username + '</p>');

});

// error middleware
// notice four arguments here. Express will know this is an error middleware
app.use(function(err, req, res, next) {

  // log my error whatever it is
  console.log("You had an error: " + err);
  
  // uh oh broken error!
  res.status(500).send("500 Error");

});


app.listen(3000 , function(){
  console.log('app running on port 3000');
});