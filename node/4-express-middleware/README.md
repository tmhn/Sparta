# Express Middleware

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Intro to Node
* Intro to Express

## This lesson covers

* What is middleware
* Using middleware
* Error middleware
* Third party middleware

Express actually uses a very simple process to create some pretty complex behaviour. Every time Express receives a request it runs through a list of functions before finally sending a response back.

You get to choose what these functions are and perhaps more importantly, the order in which they are run. 

These registered functions are called middleware. Each middleware function that we register gets access to the request object ( an object with all the info about the request ) and the response object ( an object that handles sending the response ) so they can work with them, alter them, add stuff, remove stuff; anything you want really.

Express runs through all the middleware that you've registered until one of them  returns a response. So our routes that we saw in the previous lesson are middleware too!

We use middleware for all sorts of things. We could load a logged in user and put their details in the request object so that all routes have access to the info.

We could also check the request object for uploaded files and save them to the server and then give the file info to the route to send back. 

Hopefully you can see how important the order of middleware is. If we want our route to be able to access the user object the user loading middleware middleware would ***have*** to be run first.

We saw in the previous lesson how express handles defining routes and sending responses:

```javascript
app.get("/" , function(req,res) {
	
	res.send("Hello");

});
```

This is actually a very specific type of middleware. As we go through the next section we're going to work up to proving that fact so that you get a real understanding of how express works.

## Using middleware

### All requests

We're going to start with very generic middleware functions.

You can tell express to run middleware on every request. Open the starter code and run ``npm install`` to install express. Then add the following to the app.js file:

```javascript
// log extra details for every request made
app.use(function(req,res,next){ 

 
  // get the current date 
  var now = Date.now();
  
  // log to the terminal
  console.log('Request Time: ', now);

  // we're done. move on to the next middleware
  next();

});
```

All this middleware does is get the current date as a timestamp and logs it to the terminal. Pretty simple.

The app.use() method is how we add functions to our middleware list. We just need to give it a function to run.

The function we give it needs to be able to take three parameters that express will pass in to it.

* The request object
* The response object
* The next middleware function to run

So Express runs our time logging middleware before moving on to the next middleware. 

> EXERCISE ( 5 Mins ) : Remove the next() call from the function and load the page again. What happens? Why?

Without the call to ``next()`` your request will timeout. This is because express has stopped at this point in the middleware. We haven't told it to move on through the list and so it never reaches the route middleware that returns a response.

Make sure you put the ``next()`` call back in before we move on.

So each middleware function has to call the next one when it's ready. That's what we're doing here.This is very important. Express does a lot of things ***asynchronously*** so you're middleware function may have to wait for something to finish before it moves on to the next function in the chain. 

Let's imagine that our route middleware needs to return the current date in it's response. We could get the date ourselves but it's neater and more reusable to only do it once. So let's alter our middleware to make the date available on the request object:

```javascript
// log extra details for every request made
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
```

Now we can get the date in the route middleware so let's change that too:

```javascript
// route middleware
app.get("/" , function(req,res,next) {

  // we can now use req.date here too
  res.send('<h1>Homepage on date: ' + req.date + '</h1>');

});
```

To make sure we fully understand how important order is here try moving your middleware below the route middleware. Reload your page. req.date won't be available now so you should get undefined. Make sure you put it back when you're done.

> EXERCISE ( 15 Mins ) : Create your own middleware function that runs before the route middleware. It should add an object to the request object called user. Give this object a made up username and an id. Change the route middleware to use your user object and say hello to the user.


### Specific routes

We've seen how to make middleware run on every request. But you can set middleware to run on specific paths, verbs or routes only ( getting a bit closer to the route middleware now). 

#### Path specific

Add the following underneath your middleware functions but before the routes:

```javascript
app.use("/login" , function(req,res,next) {
  
  // is the user logged in? no need for them to see the login page then
  if(req.user)
    res.redirect("/");
  
  next();
  
});
```

> QUESTION ( 5 Mins ) : Which middleware function absolutely has to come before this one?

This middleware will only run on requests that have a "/login" path but it doesnt care what the HTTP verb is. 

But it won't work properly if it comes before the user-loading middleware in the list.

Notice that we're getting a bit closer to our route definitions from the previous lesson.

#### Route specific

Try this after the last middleware function:

```javascript
app.get("/logout" , function(req,res,next) {
	
	// if the user isn't logged in no point in logging them out
	if(!req.user) 
		res.redirect("/login");

	next();
	
});
```

This middleware uses the ``app.get`` function which does the same thing as use. But it limits the middleware to only running for GET requests. It looks pretty similar to a route doesn't it? The only difference is that we don't send a response and we call the next function. In fact, in most routes we will leave out the next function from the arguments because it's not used.

We should probably add in our login and logout routes now too:

```javascript
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
```

> QUESTION ( 5 Mins ) : Why don't we use the next function here? 

We don't use the next function in this middleware because it's sending a response. As soon as we send a response that stops the list. But looking in the terminal you should see that all of our previous middleware still runs!

## Error middleware

There's one last form of middleware. Error handling middleware. This middleware is , suprisingly enough, there to catch errors. It is only different in two ways:

* The callback function takes four arguments instead of three
* It goes right at the end after all the routes and middleware

Here's an example. Copy this in below all the routes and other middleware ( but before app.listen ):

```javascript
// notice four arguments here. Express will know this is an error middleware
app.use(function(err, req, res, next) {

	// log my error, whatever it is
	console.log("You had an error: " + err);
	
	// uh oh, error!
   res.status(500).send("500 Error");
  
});
```

If you run your app now this middleware won't be called because we haven't told express that there has been an error.

Telling express that an error has occurred is easy. We just pass some value, normally a string describing the error, in to the "next" function. Let's change some of our previous middleware to throw some errors.

Change the "/" route to look like this:

```javascript
app.get("/" , function(req,res,next) {

	// check to make sure we have logged in user
	if(!req.user) 
		next("User not found");

  // we can now use req.date here too
  else
  	res.send('<h1>Homepage on date: ' + req.date + '</h1><p>Hi, ' + req.user.username + '</p>');

});
```

To make this throw an error we need to not have req.user so let's just temporarily turn off our req.user middleware by commenting it out. Kind of makes it look like the user isn't logged in.

```javascript
app.use(function(req,res,next){

  // req.user = {
  //   id: 1,
  //   username: "Steveyblam"
  // }

  next();

});
```

Load your "/" page in the browser and have a look in the terminal. You should see your error logged and the page should display your 500 error message too.


## Third party middleware

By far the most common type of middleware you'll be using is other peoples'. Behind the scenes it's absolutely no different to what we've written above. As long as we're passing a function to app.use it doesn't matter where it comes from. 

### Express static

So far the only routes that our app can respond to are the ones that we've written; "/" , "/login" and "/logout". Everything else will result in a 404. But most webservers return files like images and css without setting up a route for each file. That would be a real pain.

So we need to set this up. Express uses a bit of middleware to do this called express static. Express static listens on all requests and checks to see if you're asking for a file.

If the path in the request , something like "image.jpg" perhaps, matches up to a file in the directory that you've specified it will return that file as a response. If not it carries on through the rest of your middleware.

It can be setup like this:

```javascript
// return static files from the public directory
app.use(express.static('public'));
``` 

> QUESTION ( 5 Mins ) : Do you think this line should go at the top of your middleware list or at the bottom?

It's not a hard and fast rule but it makes much more sense for this to go at the top of your list. There's no point in running through all your middleware before returning a file so we put it first.

It may be hard to see but calling ``express.static('public')`` actually returns a middleware function ( a function returning another function?!! yep! ) that we can then put in our list. We don't really need to know what is happening behind the scenes as long as it works. That's the beauty of middleware.

This "function returning a function" is pretty common for middleware so don't be surprised when you see it. It allows to do other setup on our middleware. In this case choosing the directory.

If you have a look in the public folder you will see that there is a file in there called "jabba.jpg". You should now be able to request this file at the following path:

``http://localhost:3000/jabba.jpg``
 
## Summary

You just:

* Learned that express uses middleware to achieve pretty much everything it does
* Learned how to write middleware functions
* Saw how to make them run on every request
* Saw how to make them run on specific requests only
* Saw that routes are actually just middleware that return a response
* Saw that error handlers are just middleware but it goes at the end and takes four parameters
* Used some third party middleware to serve static files















 

















