var express = require('express');
var app = express();

app.get("/" , function(req,res) {

  res.send('<h1>Hey!</h1>');

});


// RESTFUL ROUTES FOR BOOKS
app.get('/books' , function(req , res){

  res.send('INDEX');

});

app.get('/books/new' , function(req , res){

  res.send('NEW');

});

app.post('/books' , function(req , res){

  res.send('CREATE');

});

app.get('/books/:id' , function(req , res){

  res.send('SHOW ' + req.params.id);

});

app.get('/books/:id/edit' , function(req , res){

  res.send('EDIT ' + req.params.id);

});

app.put('/books/:id' , function(req , res){

  res.send('UPDATE ' + req.params.id);

});

app.delete('/books/:id' , function(req , res){

  res.send('DELETE ' + req.params.id);

});


app.listen(3000 , function(){

  console.log('Your app is ready and listening on port 3000');

});