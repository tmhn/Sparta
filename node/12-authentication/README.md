# Authentication

## Timings

This lesson should take between 90 and 120 minutes to complete.

## Pre-requisites
* Mongoose Models
* Sessions
* Middleware

## This lesson covers

* Authentication vs Authorisation
* Authentication
* Authorisation

Now that we have sessions and cookies set up we have a really good way of storing whether a user is logged in or not. But what does it mean to be logged in?

Authentication is simply the process of proving to the system who you are. Once the system knows who you are it can decide what you're allowed to do. This is authorisation.

There are lots of methods of authentication, the most common being providing a username and password that the application can check. But you also have concepts such as facial recognition, finger print recognition, keys and tokens and a bunch of others.

We'll only be looking at the username/email and password type. Let's look at the steps.

## Authentication
 
It doesn't really matter which language or framework you use, the steps for authentication are nearly always the same. For an email/username password style authentication there are three actions that a user can take that we need to account for:

* Register
* Login
* Logout

We're going to stick with creating RESTful MVC structures to implement these actions. By this we mean all the files, folders and code needed to CRUD something. Like we created for posts. 

This gives us the benefit of unfiformity but mostly it allows to speed up development by reusing (copying and pasting) most of our posts MVC.

We'll separate our three actions in to two separate MVC structures: 

* Register will go in a structure called "users".
* Login and Logout will go in a structure called "sessions"

This makes sense if you think about it. Registering is just creating a new user by taking information from the user. 

Sessions is a bit of a stretch. But you can think of logging in as creating a new session and logging out as deleting one.

Once we have these setup we'll tweak a few things that are different for authentication and then we're done.

## Register

Registering is really just creating a new user object. So the steps are the same as creating a new post.

We need to set up our Models, Views, Controllers and routes to handle this.

> EXERCISE ( 25 Mins ) : Create the Models,Views and Controllers for the user object. You will only need to add the NEW and CREATE routes to act as a registration form. Hint: Copying and pasting from the post MVC and then making the appropriate changes is perfectly fine. 
> 
> The User model should have four fields. First name, last name, email and password. All are strings and all are required. Email should also be unique.

You should have the following:

### Model

In the command line:

```bash
touch models/user.js
```

Add the following to user.js:

```javascsript
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({

  first_name : {type: String, required:true},
  last_name : {type: String, required:true},
  email : {type: String, required:true},
  password : {type: String, required:true}

});

module.exports = mongoose.model('User' , UserSchema);
```

### Views

The form view is actually a bit simpler for registration.

In the terminal:

```bash
mkdir views/users
touch views/users/new.ejs
touch views/users/form.ejs
```

In new.ejs:

```html
<h1>Register</h1>
<% include form %>
```

In the form.ejs:

```html
<form action="/users" method="POST">
	<div>
		<label>First Name</label>
		<input type="text" name="first_name">
	</div>
	<div>
		<label>Last Name</label>
		<input type="text" name="last_name">
	</div>
	<div>
		<label>Email</label>
		<input type="text" name="email">
	</div>
	<div>
		<label>Password</label>
		<input type="password" name="password">
	</div>
	
	<input type="submit" value="Register">
</form>
``` 

### Controller

In the terminal:

```bash
touch controllers/users.js
```

In the users.js controller:

```javascript
// NEW - GET /new
function newUser(req , res) {

  // create an empty user
  var newUser = {
    id: "",
    title: "",
    body: ""
  }

  res.render("posts/new" , {
    title: "Register",
    user: newUser
  });
}

// CREATE - POST /
function createUser(req , res) {

  // data is gathered by body parser and placed in req.body

  // ask mongoose to save the data for us and wait for the response
  User.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
  });
}

// export all our controller functions in an object
module.exports = {

  new: newUser,
  create: createUser

}
```

### Routes

We only need two of our seven RESTful routes for this. NEW and CREATE. Let's add them to the config.js. Make sure you add these routes ***before*** your posts routes as they are more specific and so could be overriden by the more general routes for posts. We want them checked first:


```javascript
var usersController = require('../controllers/users');

...

// users
router.route('/users')
      .post(usersController.create);

router.route('/users/new')
      .get(usersController.new);
```

Try creating a new user. You should be redirected back to the list of posts if it worked correctly. We now have a working registration form.


## Sessions

We think about logging in and out as creating and destroying "sessions" which is essentially saving some information into our session store about the logged in user.

This fits well with an MVC structure. So we'll do the same as we did for users but for sessions this time.

Creating sessions does have a few important differences from a normal MVC strucutre:

	* We'll user the details from the form to look up a user rather than creating anything new
	* We won't have a "session" model. 
	* We will just add our user id to the session store to represent a logged in user
	* To logout we will just remove the user id from the session store


Let's create the parts of our structure:

### Views

We need a login form. The login form is basically just a NEW form as it's used to create a session. It needs an email field and a password field:

```bash
mkdir views/sessions
touch views/sessions/new.ejs
touch views/sessions/form.ejs
```
In the new.ejs

```html
<h1>Login</h1>

<% include form.ejs %>
```

And in the form.ejs

```html
<form action="/sessions" method="POST">

  <div>
    <label>Email</label>
    <input type="email" name="email">
  </div>

  <div>
    <label>Password</label>
    <input type="password" name="password">
  </div>

  <input type="submit" value="login">

</form>
```

Done.

### Model

We'll use the session store to save our session data and we've already got the User object so we can look up the user. Nothing to do here. Win.

### Controller

As with the users MVC we don't need all seven RESTful routes here. We need:

* NEW - to show the login form
* CREATE - to handle the login
* DELETE - to log the user out

In the terminal:

```bash
touch controllers/sessions.js
```

In the sessions.js file:

```javascript
var User = require('../models/user');


// NEW ( AKA Login )
function newSession(req,res) {

  res.render('sessions/new' , {title:"Login"});

}

// CREATE - Handles logins
function createSession(req,res){

  // look up the user with the details from the form
  User.findOne({email: req.body.email} , function(err, user){

      // did we find a user and does the password match
      if(user && user.password == req.body.password) {

        // save the user to the session ( log them in )
        req.session.user = user.id;

        res.redirect("/");

      } else {

        // add any other errors too
        if(err) req.flash('error' , err.message);

        // set the not found error
        req.flash('error' , "Email or password was incorrect");

        // redirect with error back to the login form
        res.redirect("/sessions/new");

      } 


  });

}

// DELETE - handle logouts
function deleteSession(req,res) {

    // clear the user from the session and redirect
    delete req.session.user;

    // redirect to login page
    res.redirect("/sessions/new");

}

module.exports = {
  new: newSession,
  create: createSession,
  delete: deleteSession
}
```

Let's talk through the create function quickly. The process for logging a user in is as follows:

* Try to load the user by their email
* If found check their password against the one supplied
* If either the email or password are incorrect redirect back to login with an error
* If both are correct store the user id in the session to show them as logged in

Logging out is simply a case of removing the id from the session and then redirecting.

### Routes

Now let's add all the routes we need to the routes.js file. Again make sure they come ***before*** your posts routes:

```javascript
// sessions
router.route('/sessions')
      .post(sessionsController.create)
      .delete(sessionsController.delete);

router.route('/sessions/new')
      .get(sessionsController.new);
```

Notice that we've moved the delete function to the "/sessions" path. This is because we only have one session that we can delete. So we don't need an ID to identify one like we do with posts.

### Add the user to the req object

We have our user's ID saved in the session now. We can use that ID to load the user from the database with every request so that we can use it in our controllers. Let's write some middleware to do that.

In the app.js add the following ***after*** your session middleware:

```javascript
var User = require('./models/user');

...

// load logged in user
app.use(function(req,res,next) {

  // no user id? just move on
  if(!req.session.user) {
  	 res.locals.user = false;
    next();
  } else {

    // load the user with the ID in the session
    User.findById(req.session.user , function(err, user){
      
      if(user) {
        // add the user to the request object
        req.user = user;
        // add it to locals so we can use it in all templates
        res.locals.user = user;
      } else {
        // couldn't find it... that's weird. clear the session
        req.session.user = null;
      }

      next(err);
    });
  }
});
```

The script checks the session for a user id. If it finds one it loads that user from the database and adds the object to the request object and also globally to the templates with res.locals.


### Navigation

Let's change our navigation so we can login, logout and see the currently logged in user. We can use our user object in the template to say hello too.

Open the navigation.ejs and change it to the following:

```html
<nav>
  <% if(user) { %>
    <a href="/">Posts</a>
    <a href="/new">New Post</a>
    <form action="/sessions" method="POST">
      <input type="hidden" name="_method" value="delete">
      <input type="submit" value="Logout">
    </form>
    <p>Welcome, <%= user.first_name %></p>
  <% } else { %>
    <a href="/sessions/new">Login</a>
    <a href="/users/register">Register</a>
  <% } %>
</nav>
```

We are checking for user and changing the navigation based on the logged in state of the user.

## Authorisation


Now that we can identify ourselves to our app we want to block access to certain parts of our app. This is called authorisation. 

The simplest pattern for authorisation is to deny users access if they are not logged in. You can have more complex patterns such as requiring a user to be logged in ***and*** an administrator to access certain areas but we'll keep it simple for the moment.

### Checking for logins

Checking to see if a user is logged should now be as easy as checking to see if req.user is set.

We can do this in any controller that we want to protect with a login. Open the posts controller and add the following to the indexPost function:

```javascript
// INDEX - GET /
function indexPost(req , res) {

  // check for login. Redirect if not
  if(!req.user)
      redirect("/sessions/new");
      
...  

```

We could continue adding this check to all of our routes. But that's boring and time consuming. We can make it simpler with some middleware. Remove the check in indexPost and add the following to the app.js just before the routes are used:

```javascript
// check for login on all routes except sessions
app.use(/^\/(?!sessions).*/, function(req, res, next) {
  if (!req.user) {
    res.redirect('/sessions/new');
  } else {
    next();
  }
});
```

There are manyy other ways to do this. Here we've use a regular expression ( you can look these up ) to search for any route that does ***not*** have "/sessions" in it. We don't want to block our login form. The user would have nowhere to go!

For everything else we check for a user and then redirect if theyre not found.

That's it. Your app is now password protected! We're not quite finished yet though. Our storing of passwords is ridiculously insecure. We'll look at storing them more safely in the next lesson.

## Summary

You just:


	* Created a new CRUD route for users ( Just the C for registration )
	* Created a CRUD route for sessions ( That's logins )
	* Used middleware to load your user and add to the req object
	* Used the req.user to decide what the user can and can't see

	



