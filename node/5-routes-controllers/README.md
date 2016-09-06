# Routes and Controllers

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Intro to Node
* Intro to Express
* Custom Modules

## This lesson covers

* Routes and Controllers
* Simple routing
* Separating code in to modules
* More tidying

Now that express is listening for incoming requests we need to tell it which requests to listen for and what to do when they come in. For this we need two things a router and a controller.

As we discussed in the intro lesson, a route is made up of a path and an HTTP Verb and it points to a function that controls what we return as a response. The function we point our route to is called a controller function. 

If we group a load of controller functions together they form a controller.

The purpose of this lesson is to first write routes and controllers the simple way. Once we've done that we'll be restructuring our code to make it more reusable and readable. 

The overall idea is to have as ***little*** code in the app.js as possible.  
 
## Simple Routes

### Static paths

Express has routing methods built in to the app object. We've already seen a few them. Open the starter code and add the following:

```javascript
app.get('/' , function(req,res){

  res.send("<h1>Homepage</h1>");

});
```

Run your app and point your browser at ``http://localhost:3000``. You should see your html rendered on the page. We've defind the 'root' route. In other words the root of the site.

The above code has two parts. Let's talk through them:

The app.get method is used for defining the route. Using the get method tells our route to watch for request that use GET HTTP verbs. 

The first argument of the method is the path. The path in this case doesn't have any parameters ( things that can change ). That's why we call it a static route.

The second argument is the function to run when we hit that route. This function is essentially our controller function.

The controller function takes two parameters, the request object and the response object. The request object holds all the information Express has collected from our request. The response object controls the response we send back.

For the moment we are using the simplest response method, send. We're sending back some basic html in our response.

The response object has a lot of other methods that set other parts of the response, like the status code for example. We'll look at those later.

### Dynamic paths

Let's create another route and controller. This one will have a dynamic parameter in the path. Even those this parameter might change it will still be picked up by the same route. 

```javascript
app.get("/:id" , function(req,res) {

	// we can access the dynamic part of the route and then use it
	var id = req.params.id;

	res.send("SHOW: " + id);

});
```

This route would match all of the following:

```javascript
http://localhost:3000/1 - SHOW: 1
http://localhost:3000/2 - SHOW: 2
http://localhost:3000/3 - SHOW: 3
http://localhost:3000/blah - SHOW: blah
...
```

These dynamic routes can trip you up because they catch everything. What if you actually wanted a separate route of /blah in the above example. Our dynamic route would grab it before we reached our blah route. The answer is to put our more specific routes at the top so they get matched first.

### Other verbs

The express app has methods for the other verbs we use in our RESTFul routes as well:

```javascript
app.post()
app.delete()
app.put()
```

> EXERCISE ( 20 Mins ) : Create the other five restful routes and make them return some simple text each time. You will need to use Postman to test your routes.


You're routes should look like this:

```javascript
app.get('/' , function(req,res){

  res.send("<h1>Homepage</h1>");

});

app.get('/:id' , function(req,res){

  res.send("SHOW:" + req.params.id);

});

app.post('/' , function(req,res){

  res.send("CREATE");

});


app.get('/new' , function(req,res){

  res.send("NEW");

});

app.put('/:id' , function(req,res){

  res.send("UPDATE:" + req.params.id);

});

app.delete('/:id' , function(req,res){

  res.send("DELETE:" + req.params.id);

});

app.get('/:id/edit' , function(req,res){

  res.send("EDIT:" + req.params.id);

});
```

## Separating code in to modules

We now have a lot of code in our app.js. Way too much code. It's also not very reusable. We need to separate our routes and our controllers in to separate files. We can do this by using node modules to separate out the different bits.

Let's first create the files and folder structure. We can use pretty much any file or folder structure we like. But  we'll use one that you'll commonly see:

```bash
mkdir controllers config
touch controllers/posts.js
touch config/routes.js
``` 

We've called our controller posts.js because as we progress we'll be creating a blog that manages posts. 

### Controller

Our controller should only contain the functions we need for our routes so let's copy all the functions from our route in to posts.js

```javascript


  // INDEX - GET /
  function indexPost(req , res) {

    res.send("INDEX");

  }

  // SHOW - GET /:id
  function showPost(req , res) {

    res.send("SHOW: " + req.params.id);

  }

  // EDIT - GET /:id/edit
  function editPost(req , res) {

    res.send("EDIT: " + req.params.id);

  }

  // NEW - GET /new
  function newPost(req , res) {

    res.send("NEW");

  }

  // DELETE - DELETE /:id
  function deletePost(req , res) {

    res.send("DELETE: " + req.params.id);

  }

  // UPDATE - UPDATE /:id
  function updatePost(req , res) {

    res.send("SHOW: " + req.params.id);

  }

  // CREATE - POST /
  function createPost(req , res) {

    res.send("CREATE");

  }

```

Because this is a module we need to export all these functions if we want to use them. We can do that by creating an object that contains them all. This is pretty common. Put the following code after your functions:

```javascript
  // export all our controller functions in an object
  module.exports = {

    index:indexPost,
    show: showPost,
    edit: editPost,
    new: newPost,
    delete: deletePost,
    update: updatePost,
    create: createPost

  }
```

Our controller can now be required and used from anywhere in our app.

### Router

Now let's move all our routes to a separate file too.

But to create routes we need access to the express because thats where all the methods are. 

Express can give us a router object to work with that just handles routes. We can plug that back in to the app when we're done setting it up. No app variable needed.

Copy the following in to routes.js:

```javascript
// pull in the express framework
var express = require('express');
// ask express for a router object to work with
var router = express.Router();
```

We can use this new router object just like we did the app variable in app.js as it has all the routing methods on it:

```javascript

router.get("/" , function(req,res) {

	res.send("<h1></h1>");

});

```

But we just spent a bunch of time moving our controller function to a module so lets use that:

```javascript

// notice that we need to use a relative path to pull our module in
var postsController = require('../controllers/posts');

router.get("/" , postsController.index );
```

We've given our router a path, a verb and a function to run just like before. But now it's a bit tidier.

We need to do one last thing. We need to export the router then tell our app to use it. At the bottom of the routes.js file add the following:

```javascript
module.exports = router;
```

Back in the app.js we just need to require our module and tell express to use the router we exported:

```javascript
// our routes module
var routes = require('./config/routes');

// use the router
app.use(routes);
```

Restart your app and go to ``http://localhost:3000/``

You should see your homepage.

> EXERCISE (10 Mins) : Create all the routes you need in routes.js and test them with postman. 

## A bit more tidying

There are lots of ways to structure your code and lots of helper functions to help you do it. Express routers have another method that can help us make our routing file just a bit tidier.

You may notice that a lot of your routes have the same path. We can use the router.route function to pull them all together so we don't have to repeat ourselves.

> NOTE : This last bit of tidying isn't strictly necessary. So don't worry if it's a step too far for you. But you might see other people's code written like this so it's good to know what's going on.

Your routes can be replaced with the following:

```javascript

router.route('/')
      .get(postsController.index) // GET "/"
      .post(postsController.create); // POST "/"

router.route('/new')
      .get(postsController.new) // GET "/new"

router.route('/:id')
      .get(postsController.show) // GET "/:id"
      .put(postsController.update) // PUT "/:id"
      .delete(postsController.delete); // DELETE "/:id"

router.route('/:id/edit')
      .get(postsController.edit); // GET "/:id/edit"
```



 
## Summary

You just:

	* Created the seven restful routes the simple way
	* Moved the routes in to a module
	* Moved the controller functions to a module
	* Combined them and used them in app.js
	* Saw a few ways to tidy up routing even further



















 

















