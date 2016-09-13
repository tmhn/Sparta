# Creating a JSON API

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Mongoose Models
* Controller

## This lesson covers

* HTML App vs JSON API
* API Controller
* The routes
* Rendering
* Request data
* Redirects and errors

Because we've done such a good job of separating our code into reusable files and objects, turning our HTML app in to a JSON API should be pretty straight forward.

The only differences between the two are:

* The HTML app return HTML. The JSON API will return JSON
* We don't need templates and renderers for the JSON API. We just return JSON
* We don't redirect in the API. All routes return a response themselves.
* The HTML app expected data to be sent from a form. The JSON API will expect JSON

That's it. We'll setup our app to run as an HTML app and a JSON API at the same time. Let's begin:

## API Controller

We only have a few parts to change or add but first let's make a new folder just for API controllers and create a copy of our original controller that will just run the API. 

```bash
mkdir controllers/api
cp controllers/posts.js controllers/api/posts.js
```

## The routes

Our API can't have on the same routes as the HTML app. One of them would lose that fight. 

We could change routes to our API entirely but we might as well just add "/api/posts" to the front of all the routes for the API. Much quicker and very easy to do. Open the config and add the following:

```javascript
var postsApiController = require('../controllers/api/posts');

...

// API section
router.route('/api/posts')
      .get(postsApiController.index)
      .post(postsApiController.create);

router.route('/api/posts/:id')
      .get(postsApiController.show)
      .put(postsApiController.update)
      .delete(postsApiController.delete);
```

We've pulled in our new controller and created some new routes that point to it.

So we end up with the following new routes for the API:

* /api/posts GET - INDEX
* /api/posts POST - CREATE
* /api/posts/:id GET - SHOW
* Etc

> QUESTION ( 5 Minutes ) : Which routes are missing? Why?

We don't need the NEW and EDIT forms any more because they are used in a browser for choosing which data to send. We won't be making requests to our API from a browser so they aren't needed. 

Our API controller is now totally separate from our HTML controller and won't interfere with the routes.

Before we can test it we just need to tweak one thing. Because our controller is in a new directory our Post model require path will be wrong. It needs to go down one more directory. Open the API controller and change to the following at the top:

```javascript
var Post = require('../../models/post');
```

You should now be able to start the app and navigate to "/api/posts". Because the controller is the same we will just see our HTML app for the moment.


## Rendering

The next thing that we need to change is how the controller renders a response. The HTML app uses EJS to render HTML and returns that. We just want to return JSON from our API.

Luckily, the data returned by our model is still perfectly fine to use, and because it is already in JSON format ( thank you mongoose! ) we just need to tell the controller to render it as JSON. For that we can use the ``res.json()`` method.

Open the api posts controller and change the index function to the following:

```javascript
// INDEX - GET /
function indexPost(req , res) {

  // get the model to load all the posts. wait for data in the callback
  Post.find({} , function(err, posts) {

	  // check for errors and return 500 error and message if found
	  if(err) return res.status(500).send(err);
	
	  // render the object as JSON
	  res.json(posts);

  });

}
```

The ***only*** line we changed is the one that renders the data. That's it. Load your page again. You should now get a json response. The JSON method will take whatever object ( or any other data type ) you give it and try to create a JSON response from it. It also sets the headers for the response to tell the requester that it's getting JSON back. Easy.

But we're not done yet.

> EXERCISE (5 Minutes) : Change the SHOW method to render JSON. You can also remove the EDIT and NEW functions now too.

Your SHOW controller function should look like this:

```javascript
function showPost(req , res) {

  Post.findById(req.params.id , function(err, post) {
    
    
      // check for errors or for no object found
      if(!post) return res.status(404).send("Not found");
      if(err) return res.status(500).send(err);
  
     // render the object as JSON
     res.json(post);
  
  
  });

}
``` 

## Request data

Open the app.js and find the following line that includes the body parser:

```javascript
// body parser
app.use(bodyParser.urlencoded({ extended: false }));
```

Let's remind ourselves what the body parser does. 

The body parser looks in the request for data that was sent from a form then packages and sorts it in to a nice JSON object. We can then access it through ``req.body`` inside our middleware and routes.

Most of the time our API won't be sent data from a form. We want to be able to send JSON to the API and have it use that. 

To make body parser also look for JSON in the request and make that available to us just takes one more line: 

```javascript
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
```

It can even handle looking for form data ***and*** JSON at the same time, only using whichever it finds. So it won't even break our HTML app.

To test this we need to open Postman and send a request that has JSON in the body. 

In the url field type 'http://localhost:3000/api/posts' and set the verb to POST.

We'll be trying to create a new post object. So we need a json object that will represent the data that we need:
	
	* Open the "body" tab 
	* Select "raw" as the encoding type.
	* Then choose "application/json" from the drop down list.
	* Paste the following json in to the body area

```javascript
{
	
	"title": "My JSON",
	"body": "This post was created from JSON sent from Postman",
	"rating": 5
	
}
```

If the request is successful you'll be redirected back to the HTML app index page. 

That's not where we want to be. So we have a few more changes to make.

## Redirects and errors

We don't usually redirect in a JSON API. It's perfectly acceptable to return a blank screen with just a status code or to return the JSON object that was created etc.

We also don't want to put our errors in the flash session. They need a proper status code and an error message rendered as JSON.

We have three routes that need updating:

#### CREATE

When we create a new post in our API it's standard practise to return the new object so let's do that and change the error response too:

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) res.status(500).json({error: err.message});
  
    // return the object
  	 res.json(post);
  
  });

}
```

Try your CREATE request again. This time you should get the new post returned as a JSON object.

#### UPDATE

Just like creating we would normally return the newly updated object instead of redirecting. The error checking will be the same as above:

```javascript
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( 
        req.params.id, 
        { $set:  req.body }, 
        { runValidators: true }, 
        function(err , post){
      
          // check for errors and return 500 if there was a problem
          if(err) res.status(500).json({error: err.message});
          
          // return the object
          res.json(post);
    
        }
    );

}
```

We need to test this:

* Grab an ID from one of your posts and add it to the URL. 
* Set the verb to PUT
* Paste in the original JSON for your post in to the body section.
* Make a change to one of the fields
* Send the request

The UPDATE controller should now return the updated post as json. But it doesn't. It returns the original unchanged post. Hmmm.

Try sending the same request again. This time it should return the new version. 

This is a very strange quirk of Mongoose.

**When updating an object with Mongoose it performs the save, but returns the original, unchanged object to your callback**

So your post did save the first time round. But you returned the old one in the response. We need to tell mongoose to return the ***updated*** version. We do this with an option in the config object.

```
function updatePost(req , res) {

    // data is gathered by body parser and placed in req.body
    
    // load, bind and save all in one hit
    Post.findByIdAndUpdate( 
        req.params.id, 
        { $set:  req.body }, 
        { runValidators: true, new:true }, // true returns the new doc
        function(err , post){
      
          // check for errors and return 500 if there was a problem
          if(err) res.status(500).json({error: err.message});
          
          // return the object
          res.json(post);
    
        }
    );

}
```

> NOTE : "new" defaults to false in Mongoose. In Mongoose 4 it has, apparently, been changed to true by default. So this might not be a problem for much longer.

If you run your test again now you should see the newly updated post each time.


#### DELETE

We really just want to tell the user whether the DELETE request was successful or not. We can do this with status codes, usually 200 or 204. No need to render anything. Change the delete function to the following:

```javascript
// DELETE - DELETE /:id
function deletePost(req , res) {

  // tell the data store to remove the post with the id in the request
  Post.findByIdAndRemove(req.params.id , function(err) {
  
      // check for errors and return 500 if there was a problem
      if(err) res.status(500).json({error: err.message});
  
      // redirect to a GET request
      res.status(204).json(); // 204 - no content
  
  });
  
}
```

You can test this in much the same way as the UPDATE route. Notice that you're response body is empty and the status code will be 204. Any app or package that's using our API will be content with just the status code.

That's it. We've changed all our routes to act as an API. We reused our models and most of our controller code and routing too.


## Summary

You just:

	* Created a new controller and route just for the API
	* Used res.json to render JSON instead of HTML
	* Return JSON encoded errors instead of using the flash session
	* Saw that each route must now return it's own response. No redirects
	* Saw that mongoose returns the old object when updating and how to fix it

	
	


	

	



