var express = require('express');
var app = express();
var cors = require('cors');

var dummyTweets = [
  {
    message: "React is great!",
    author: "@steveyblam"
  },
  {
    message: "React is ok!",
    author: "@steveybob"
  },
  {
    message: "React is edging towards node!",
    author: "@steveynode"
  }
];

var dummyUser = {

  id : 1,
  username: "Spartan",
  email: "spartan@sparta.com"

}

app.use(cors());

app.get("/api/tweets" , function(req,res){

  res.send(dummyTweets);

});

app.get("/api/user" , function(req,res){

  res.send(dummyUser);

});

app.listen(3000,function(){

  console.log('app is listening...');

});