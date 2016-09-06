# Express Intro

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Intro to Node

## This lesson covers

* What is Express
* Installing Express
* Your first page
* Nodemon

Our node apps have been painfully simple so far. They haven't done much more than say a few words or print a few things to the screen. We're learning to be web developers and so far with node we haven't built anything for the web! This is where express comes in.

Express is a node package just like all the others we've used. It's code written by other people to make things easier. It helps us to respond to requests, to return responses and many many other things. Express can also create us a server that will listen for incoming requests. So it does an awful lot for us. 

When a package makes it easier to perform a collection of similar tasks it is called a framework. Express is a web framework. So it makes it easier for us to build web applications.

In this lesson we'll install express and get it to spin up a server for us and listen for an incoming request.

## Installing express

We install express just like any other package. So let's create our npm manifest first:

```javascript
npm init
```

As always, hit enter to give all the default values here. Now we can install express.

```javascript
npm install express --save
```

When npm finishes installing express open up the node_modules directory and take a look. You should see that there a ***lot*** of other packages in there. Most modern frameworks use a lot of ***other*** packages ( dependencies ) pulled together to make something bigger. It's a good way to do things so keep it in mind.

We will, as always, need an entry point file so let's create that now:

```javascript
touch app.js
```

Open up the app.js file and put the following at the top:

```javascript
var express = require('express');
var app = express();
```

Let's look at what's happening here. We are requiring the express module just like we would any other module. But on the next line it appears that the express module returns a function because we call it. 

We saw in the custom modules lesson that a module can export just about anything. This includes functions. This is simply how the guys who built express have decided to have it work. The function exported by the express module is used to setup and create new express applications. And that's exactly what we've done on the next line.

The first thing we want express to do for us is to spin up a server and listen for requests.

The express app we just created has a method just for that. Add the following at the bottom of you app.js:

```javascript
app.listen(3000 , function() {
	console.log('Your app is ready and listening on port 3000');
});
```

The listen method takes two arguments. The first is the port number to listen on. Typically webservers listen on port 80 but we usually use 3000 for testing. You can actually use anything you like ( as long as it isn't taken already ).

The second argument is a callback function that is called when the server is up and running. It's a good place for us to log that the server has started.

Let's run the code and see what it's doing for us. Type the following in the terminal:

```bash
node app.js
> Your app is ready and listening on port 3000
```

You should see your message logged out in the terminal. Express has created a server and opened a port on ***your machine*** and it's now listening for requests on that port.

## Your first page

Let's try a request. Open your browser ( or postman if you prefer ) and type the following address in to the address bar:

```
http://localhost:3000
```

``localhost`` points us to our own computer and ``:3000`` specifies which port.  In this case the one we told express to listen on.

If you send this request you should get a message ``Cannot GET /`` and if you used postman you should see that you got a 404 status code aswell.

This is actually express responding to our request. You should remember from the REST lesson that a route is made up of a minimum of two parts; The path and the
HTTP verb.

So it is telling us that it does not have a route that matches with the verb GET ***and*** the path "/".

So let's create this route in express. Before app.listen add the following:

```javascript

app.get("/" , function(req,res) {

	res.send("Hey!");

});

```

The express app has a built in method called ``get``. It takes two arguments. The first is the path to listen on. This creates a verb and path pair for us ( a route ). The second is simply a callback function that express should run if it matches the route that we defined. 

The callback gets given two objects by express. We've called them ``req`` and ``res``.

``req`` is an object that contains all the information about the request. It will have all the extra information that we can send such as parameters, the body data and headers.

The ``res`` object represent the response that we're going to send back. ``res.send`` is one of a few methods that it has that we can use to say 'ok send this back in the respone'.

Here we are telling express to simply send back the text 'Hey!'

> DISCUSSION : Try reloading your page in the browser now. What are you expecting to see? What do you see?

When you reload the browser after making these changes you would expect to see your new response but instead we get the same error as before! This is because node has not reloaded your new code. It's still using the old version. 

We need to restart the server. In the terminal you can use ``ctrl + c`` to exit the running code then start it again. Now reload the page and you should see the 'hey!' message.

## Nodemon

This stopping a starting can be a pain when you're testing your code. There is a nice helper tool that we can use that will watch for us making changes to our code and restart the server each time. It's called Nodemon.

We need to install it before we can use it:

```bash
npm install nodemon -g
```
As with all the really useful stuff we've installed this globally with the ``-g`` flag so that we can use it in our other projects too.

Now we can run our app with nodemon instead of node:

```bash
nodemon app.js
```
You should now see a message stating that nodemon is watching for changes in all of your files.

Try changing the message in our response to the following:

```javascript
res.send('<h1>Hey!</h1>');
```

As soon as you hit save nodemon will restart your server for you. And if you refresh your page you'll see the new version.

> EXERCISE ( 30 Minutes ) : Use the express documentation ( or take a guess ) and create seven RESTful routes for a book resource. It is not important yet what they return in the response. Just make it easily identifiable. Use postman to test all your routes. So the index route might look like the following:

```javascript

app.get('/books' , function(req , res){

	res.send('INDEX');

});

``` 
 
## Summary

You just:

* learned that express is a framework that makes web apps easier to build
* learned how to install express
* learned how to create a new express app
* spun up a server with express on port 3000
* created some routes using express and tested them
* installed nodemon to make testing easier













 

















