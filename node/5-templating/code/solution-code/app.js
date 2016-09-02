var express = require('express');
var app = express();
var layouts = require('express-ejs-layouts');

app.set('view engine' , 'ejs');

// include the express layours middleware
app.use(layouts);

app.get("/" , function(req,res){


  res.render("index" , {
      username: "Steveyblam", 
      posts: [
                {
                  title: "Post 1",
                  body: "Wow that jumped a notch"
                },
                {
                  title: "Post 2",
                  body: "But it's not too bad really"
                },
             ]
      });

});

app.listen(3000 , function(){
  console.log('listening on port 3000');
});