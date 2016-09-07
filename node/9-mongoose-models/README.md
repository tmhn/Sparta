# Mongoose and Models

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Mongo and NoSql
* Node
* Express

## This lesson covers

* Mongoose
* Connecting to the database

Now that we're experts in all things database it's time to tie our application into our database and get rid of that terrible array of posts.

We could connect to our mongo database directly and run the commands we want, get back the data and then parse the BSON into JSON. But who really has that sort time?

Instead we're going to use a node package called Mongoose. Mongoose is a collection of methods that will help us connect and query our database in some very powerful ways. Let's begin.

## Connecting to the database

As always, we need to install the mongoose package. Open the starter code and type the following in the terminal:

```bash
npm install mongoose --save
```

Now let's pull it in to our app and connect to our database:

```javascript
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/posts');
```

The url used in the connect method points mongoose to your machine on localhost and to the "posts" database.

You may remember from the NoSQL lesson that it doesn't actually matter if the "posts" database doesn't exist yet. Mongo will create it for us as soon as we start trying to use it.

Restart your app now and your app should connect to the database. If you get no errors we're good to go.

> NOTE : If you haven't got your mongod server running in another terminal window you'll get an error that mongoose can't connect. Make sure you start that server!

## Models and Schemas

Finally we get to write some actual models! 

The first thing we need to do is to describe to Mongoose what our objects should look like and how they should relate to eachother. 

Once we've done this Mongoose will create all the right methods, know how to talk to the database about our post documents and a whole bunch of other cool stuff.

These ***descriptions*** are called schemas and we create them in separate node modules to keep things tidy:

```bash
mkdir models
touch models/post.js
```

Open the post.js file and add the following:

```javascript
var mongoose = require('mongoose');

// create a new schema
var PostSchema = mongoose.Schema({});

// tell mongoose to create a real model from our schema and export it
module.exports = mongoose.model('Post' , PostSchema);
```

This code is quite simple. We pull in mongoose, as usual, because we need to use it to create a schema.

We've created a completely blank schema ( notice the empty JSON object ) and then we've asked mongoose to create a model from it.

Finally we export the model from our module because that's the bit we'll need to use.

Let's tell mongoose what a post document should look like:

```javascript
// create a new schema
var PostSchema = mongoose.Schema({
	title: String,
	body: String
});
```

We've added two fields to our schema, name and body, and told mongoose what type of fields they are. In this case they are both strings. This is really important when we work with databases. The database will complain if we try to do number stuff to a string and vice versa. So setting the correct type is important.

That's it. Our Post model is now ready to be used to perform all our CRUD actions. Let's start using it in our controller.

We need to pull our post model in to our posts controller. Add the following to the top of your controller file:

```javascript
var Post = require('../models/post');
```

Notice the capital P on Post. This isn't ***strictly*** necessary. But we don't want confusion between a post object and the Post model. So it's always best to name your Models with captials.

We can delete our dummy posts array from the top now too.

## INDEX

For this route we need to ask mongoose to load all our saved posts. Currently we're using the array but we don't want to use that anymore. Add the following to the indexPost function:

```javascript
function indexPost(req , res) {

  // get the model to load all the posts
  Post.find({} , function(err, posts) {


  });

}
```

The model has a find method which will search by the criteria we pass in as a JSON object. The options we have are very similar, if not identical, to the ones we were using directly in mongo. 

Because this method is run from the class it's known as a static method.

We've passed in an empty JSON object to indicate that we want every post. I.e no filtering at all.

But what the hell is going on with the second part? We mentioned way, way back in the middleware lesson that that node does a lot of things ***asynchronously***. That's what's happening here. 

The call to the database will start and carry on running in the background  while the rest of the function continues.

But we can't send our response until we have this data so we have to wait for it to come back with the data before we can render. So the second argument is a callback function that will be called when the database call is finished.

So let's move our render code inside there so we can use the posts that come back.

```javascript
function indexPost(req , res) {

   // get the model to load all the posts. wait for data in the callback
  Post.find({} , function(err, posts) {
  
		// data returned so now we can render
		res.render("posts/index" , {
	      title: "Posts",
	      posts: posts
	    });

  });

}
```

Notice that the callback function takes two arguments. The second argument is the data that we've asked for. We've called it posts here to make it match with our render script.

The first argument is an error object. We can check this to see if our query was successful. If it wasn't we can return an error instead. Let's add that now:

```javascript
function indexPost(req , res) {

  // get the model to load all the posts. wait for data in the callback
  Post.find({} , function(err, posts) {

	// check for errors and return 500 error and message if found
	if(err) return res.status(500).send(err);

	// data return so now we can render
	res.render("posts/index" , {
      title: "Posts",
      posts: posts
    });

  });

}
```


Restart the app and load the index page. It should be empty at the moment because we don't have any posts in the database.

Let's move on to the CREATE route now so we can get some data in to our database.


## CREATE

So looking at our existing code we have the following steps:

* Create a blank post object
* Bind the data from the request to it
* Save the object
* When it's saved redirect to a GET request

The process isn't any different when use a Model. It's just different code. So let's swap some stuff out. Creating a blank object is easy with mongoose:

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = new Post();
  
  ...
```

We can create a new post object using the "new" keyword.

The next step is to bind the data from the request in to the object. We can actually do this all in one line with a model by passing in the whole of req.body to the constructor function. It will bind all the data for us:

function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = new Post(req.body);
  
  ...
```

Now we need to save the object. Like before there will be a callback and some error checking to do before we can perform our redirect. Let's ask mongoose to save the object we created:

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = new Post(req.body);

  // ask mongoose to save the data for us and wait for the response
  post.save(function(err, post){
  
  	// redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });

}
```

Notice here that the post object itself has a save method on it and it also takes a callback function. This is called an instance method because it's called from an instance of the Post type unlike our static find method from before.

We still get an error object like before so let's check for that in the same way:

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = new Post(req.body);

  // ask mongoose to save the data for us and wait for the response
  post.save(function(err, post){
  
  	// check for errors and return 500 if there was a problem
  	if(err) return res.status(500).message(err);
  
  	// redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });

}
```

Restart the app now and try creating a new post with the form. We should be redirected back to our index page with a brand new post waiting there for us!

### Quicker way

Mongoose actually has an even quicker way of creating new objects. It basically combines the new object, bind and save steps in to one hit. Use whichever you prefer.

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
  	// check for errors and return 500 if there was a problem
  	if(err) return res.status(500).message(err);
  
  	// redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });

}
```

## SHOW

We need to get our model to load a single post for this route. We've got a new ( slightly wordy ) method for loading a single object called findById. If we used the find method it would return an array which we don't want. FindById returns a single object.

We'll do this one in one go because you should recognise all the parts by now. We'll add in one more error check too. If no post is found it wouldn't throw an error. But we want that to be a 404 for our app.

```javascript
function showPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
  	
  	  // check for errors or for no object found
  	  if(!post) return res.status(404).send("Not found");
     if(err) return res.status(500).send(err);
  
  	  res.render("posts/show" , {
	    title: "Post",
	    post: post
	  });
  
  });

}
```

If you load a page now you should see that the id is one of our horrible mongoose ids. But it works!

## EDIT

Luckily for us the EDIT route is ***exactly*** the same as the SHOW route! The only difference is the template that's rendered.

Let's copy and paste the SHOW code and make sure we change the function name and the template name to "edit".

```javascript
function editPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
  	
  	  // check for errors or for no object found
  	  if(!post) return res.status(404).send("Not found");
     if(err) return res.status(500).send(err);
  
  	  res.render("posts/edit" , {
	    title: "Post",
	    post: post
	  });
  
  });

}
```

That was easy. Next.

## UPDATE

The UPDATE route is probably the one with the most changes. Let's look at the steps:

* Load the object using the post id
* Bind the request data to that object
* Save the existing object back to the database with it's new values
* Redirect

We could do this in little steps like above but mongoose will let us combine the first three steps in to one with a method called findByIdAndUpdate. Just like we did with the quicker CREATE method!

It works pretty much the same way as the find methods from before except that this time we want to give it the new data for the object straight away. And as always a callback for when it's finished.

```javascript
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( req.params.id , { $set: req.body }, function(err , post){
    
    	  // redirect the user to a GET route. We'll go back to the INDEX.
    	  res.redirect("/");
    
    });
  

}
```

Blimey that was easy. Mongoose is magic.

## DELETE

That only leaves us with DELETE to change. I'm sure you could take a really good guess by now that there might be a findByIdAndDelete method. Close. It's called findByIdAndRemove instead.

```javascript
function deletePost(req , res) {

  // tell the data store to remove the post with the id in the request
  Post.findByIdAndRemove(req.params.id , function(err) {
  
  	  // redirect to a GET request
  	  res.redirect("/");
  
  });
  
}
```

That's it. All our routes now use a real mongoose model to interact with a database. Restarting the app won't reset the data.

Looking back over your code you may feel like it's become very complex. But the worst part of it is most likely the callbacks. They make things look messy and they push things out of order in the code.

If you make sure you're really clear on how the callbacks work you'll see that the code is actually very simple.

Congratulations! You've created your first full CRUD app.


## Summary

You just:

	* Installed mongoose and connected to the database
	* Created a mongoose model for our Post object
	* Used our model to perform CRUD actions in all seven restful routes
	* Saw that mongoose has quite a few ways of doing the same thing
	* Learned the difference between static methods and instance methods

