# Sessions and cookies

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Mongoose Models

## This lesson covers

* Sessions and Cookies

Sessions and cookies allow us to temporarily store simple data for use in our app. We could, as you've seen, use a database for doing this. But that would be overkill. Sessions and cookies are better suited to storing temporary, simple data about how your user is currently using your application.

The biggest difference between sessions and cookies is where they are stored:

* Sessions are stored on the server
* Cookies are stored on the users browser

Let's have a look at how they work.

## Cookies

You've probably seen a lot of messages about cookies when browsing the web. The goverment decided they needed to be regulated for reasons that baffle everyone. 

Cookies are extremely simple key-value pair stores. They can also have an expiration date. Which makes them great for storing whether a user is logged in or not amongst other things.

A server is only allowed to read cookies that it created. But they're still not very secure so the rule of thumb is this. Don't store anything in a cookie that you wouldn't want everyone to see.

Let's add support for cookies to our app:

```bash
npm install cookie-parser --save
```

Cookies are sent along with ever request by the browser. With the body data we needed the body-parser package to collect the data and put it in the req object for us. Now we need the cookie-parser to do the same with cookies.

Open app.js and add the following:

```javascript
var cookieParser = require('cookie-parser');

// add support for cookies
app.use(cookieParser());
```

That's all we need. Our app can now read and set cookies on the user's browser. Let's try and set a simple cookie. Let's create some middleware to track a users page views. In the app.js add the follwing before your routes:

```javascript
// track page views
app.use(function (req , res, next) {

	// we now have an object on req that contains our cookies
	var views = req.cookies.views;
	
	// increase the page view count
	if(views)
		views++;
	else
		views = 1;
	
	// and a method on res used to set a cookie
   res.cookie('views', views);
   
   // move on to the next middleware
   next()
   
});	
```

Start up your app and head to any page. Open the inspector window with ``CMD + Alt + j``.

In older version of chrome the tab we need was called "resources". It's now called "application". Open this tab and look for the cookies section. There should now be an entry for our localhost url ``http://localhost:3000``. Open it up and you should see our views cookie!

### Expiration

We can set the cookie to expire after a fixed amount of time. This is great for storing user logins. We'll use it in our middleware to make the count reset if you don't visit the site for an hour:

```javascript
app.use(function (req , res, next) {

	// we now have an object on req that contains our cookies
	var views = req.cookies.views;
	
	// increase the page view count
	if(views)
		views++;
	else
		views = 1;
		
	// and a method on res used to set a cookie
	// the third option is a json object with options
   res.cookie('views', views, { maxAge: 60*60*1000 });
   
   // move on to the next middleware
   next()
   
});	
```

## Sessions

Sessions can actually be stored in any one of a number of different session storage engines, which are basically simple,fast databases. They are different from cookies in that the data is stored on the server not the user's browser. 

For this reason session data is a little more secure. But still not entirely so. It is also really only intended to be used for simple data that is needed frequently. Because sessions also have an expiration don't store anything in there that you wouldn't want to lose.

Sessions use cookies too. They store an id on the user's browser which tells the server which session to look up.

Let's get sessions set up:

```bash
npm install express-session --save
```

Add the configuration script to the app.js ***after*** your cookie middleware:

```javascript
var session = require('express-session');

...

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'spartasupersecretkey'
}));
```

And that's it. We now have a req.session object to work with. The extra options we passed aren't really important to us right now but here's what they are:

* resave - should all sessions be saved to the database even if nothing was changed
* saveUnitiliazed - should new sessions be saved even if they're empty
* secret - the key to use for encrypting our session data. Like a password

Our previous page counter was all well and good but using a cookie to store this info is exactly perfect. The user can mess with the data for a start. Let's change it to use the session instead:

```javascript
app.use(function (req , res, next) {

	// we now have an object on req that contains our session
	var views = req.session.views;
	
	// increase the page view count
	if(views)
		views++;
	else
		views = 0;
		
	// log
	console.log('User has ' + views + ' page views');
	
	// everything is on req now as we don't send the session back in the response
   req.session.views = views;
   
   // move on to the next middleware
   next()
   
});	
```

If you refresh your page you'll see the log in the terminal but you'll also see that we have a new cookie in the browser called ``connect.sid``. This is how the browser tells the server which session belongs to it. 

You can store pretty much any json object ( minus the methods ) in the session. It doesn't just have to be simple numbers. So sessions are great for storing information about the logged in user.

## Flash messages

In a few of our routes we finish the action and then redirect to a different route. This makes it pretty hard to show the user a message about what went wrong.

If there is an error with a save it would be nice to send the user back to the form with a message about what went wrong.

We could put this message in the session and grab it in the next request but there are packages that handle this particular use case for us. 

This pattern is called flash messaging. It uses the session to maintain a list of messages and removes them from the list as soon as they have been dsplayed. 

Let's install a package called connect-flash to help us:

```bash
npm install connect-flash --save
```

Because this package uses both cookies and session the setup ***must*** come last.

```javascript
var flash = require('connect-flash');

...

app.use(flash());
```

Now that that's setup we have a flash() method available on req. This will push messages on to a stack that we can retrieve and display layer.

Let's replace all our error checking in our controller with flash messages for the CREATE route:

```javascript
// ask mongoose to save the data for us and wait for the response
  Post.create( req.body , function(err, post){
  
    // check for errors and return 500 if there was a problem
    if(err) req.flash('error' , err.message);
  
    // redirect the user to a GET route. We'll go back to the INDEX.
   res.redirect("/");
  
});

```

We'll also need to display our messages somewhere. It would be nice to be able to see the messages no matter which page you end up on. So lets create a new partial and put it in the layout:

```bash
touch views/partials/messages.ejs
```

Flash messages are a list so we'll need to loop through all of them and display every error that's available. Add the following to messages.ejs:

```html
<div id="messages">
    <%= errors %>
</div>
```

And include the partial in the layout.ejs:

```html
<body>
  
   <% include partials/navigation  %>
   <% include partials/messages %>
   
...   
```

Now we'll need that "errors" variable in every template. Rather than do this in every controller ( which would be a pain ) we can set a variable that is available in every template using some middleware and res.locals. 

Add the following to your app.js ***after*** the flash middleware:

```javascript
// middleware to make flash messages available in every template
app.use(function(req, res, next){
    // res.locals will be available in every template
    res.locals.errors = req.flash('error');
    console.log(res.locals.errors);
    next();
});
```

We will now have a list of errors available in every template we render.

Try creating a blank post again. This time you should be redirected and you'll see your error message at the top of the index screen!

> EXERCISE ( 20 Mins ) : Use flash messages to tell the user when a post was created successfully, When an update was successfull or there was an error and when a post has been deleted. Hint: You won't want to use the errors list in flash for all these messages so you may need to update your messages partial to display other types of message as well.



## Summary

You just:
	
	* Learned that we can use cookies and sessions to store simple data that expires
	* Saw that cookies store info on browser and installed the cookie parser to read them
	* Saw how to setup sessions and to store simple data on the server
	* Set up flash messages to use both cookies and sessions to store messages for the user
	* Used res.locals to add variables to every template.

	

	



