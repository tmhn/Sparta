# Forms and Method Override

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Intro to Node
* Intro to Express
* Middleware
* Templating
* Controllers

## This lesson covers

* The next four routes
* Creating forms
* Accessing the data
* Creating a new object
* Editing
* Updating

In the templating lesson we implemented the first two of our seven restful routes. INDEX and SHOW.

We're now going to implement four more. These four routes are actually two pairs of routes that work together.

NEW - Displays a form that allows users to create a new post
CREATE - Recieves the data from the NEW form and saves the data

EDIT - Displays a form that allows users to edit an existing post
UPDATE - Recieves the data from the EDIT form and updates the data

To do this we'll need to do learn two new things. Firstly how to get access the data that we've sent from a form and secondly how to handle the fact that forms can only send GET and POST requests. We need them to send PUT as well for our update route.

We'll also be using partials to keep things neat.

Let's create some basic forms. 

## Creating forms

HTML forms are designed for collecting data from a user and sending it to a server to handle. A form needs a few things to work. One thing to keep in mind is that forms haven't been updated over the years. So there are few bit of terminology and problems with them that may seem pretty stupid. It's just because they're old.

Open your NEW template and add the following after the header:

```html
<form></form>
```

Start your app and click the "new post" button at the top. The form tag is invisible as we haven't added anything to it yet. But it is there.

### A route

The form needs to know where to send the data. It needs a route. This, as always, is made up of a path and a verb. In a form the path is called the action and the verb is called the method. 

We'll start with our NEW/CREATE routes.

We want the form to send the data to our CREATE route. The create route is:

``POST "/"``

Let's add this route to our form tag:

```html
<form action="/" method="POST"></form>
```

### Inputs 

Forms contain inputs that are used to collect different types of data and to perform actions. These can include text, radio buttons, checkboxes and buttons.

Firstly we'll need a way to submit the form. The most common way to submit a form is with a submit button so let's add that now:

```html
<form action="/" method="POST">
	<input type="submit" value="Save Post">
</form>
```

Refresh your page and you should see the submit button. If you click it you should be taken to your create route. So far it won't do much. Just takes us to the route.

Now we need to add some inputs that will allow the user to create a new post. So we will need an input for the title and another one for the body text. It's up to us to choose the most appropriate type of input to use each time. We've gone for a text input and the slightly larger textarea input.

```html
<form action="/" method="POST">
	<input type="text" name="title" placeholder="Enter a title">
	<textarea name="body" placeholder="The body of the post"></textarea>
	<input type="submit" value="Save Post">
</form>
```

The name attribute for each tells us where to look for the data later on. These should match up with the fields on our post object in javascript.

> NOTE : The form looks a bit rubbish at the moment. But it works. And forms can easily be styled with CSS. We'll look at that later.


## Accessing the data

### Body parser

Our form has collected some data for us and sent it off to our CREATE route to handle. Unlike some other languages and frameworks, Node/Express doesn't actually give us access to this data out of the box. Sigh.

We need some middleware to look in to the request and to package it up into a format we can use.

We'll need some middleware called body-parser to do this. So let's install it:

```bash
npm install body-parser --save
```

Now let's make express use it. In your app.js add the following:

```javascript
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
```

Not quite as simple as it has been for middleware before. But all we are doing here is telling express that the type of data it should expect will be coming from a form ( known as x-www-form-urlencoded data ) and it should handle it accordingly.

This isn't always true as we might send it data from an app or from Postman etc. We'll see some other options later in the course.

> IMPORTANT NOTE : Body parser MUST be added before your routes. Otherwise the routes won't have access to the data.
 
What body parser will do for us now is gather up all the data from our request, turn it into a JSON object ( awesome ) and but it in a variable on the request object called body. 

### Req.body

Let's see what data we've been sent. Ope your posts controller and add the following to the createPost function:

```javascript
function createPost(req , res) {

  console.log(req.body);

  res.send("CREATE");

}
```

Navigate to your new form, enter some data into the fields and hit submit. Now check your terminal. You should see the data logged as a JSON Object.

## Creating a new object

How we use the data to create a new post at this stage will depend entirely on how we're storing the data. As we haven't looked at models yet we'll use our cheat posts array and add a new object to that. The important thing to remember is not how to work with this array but to remember the process so you can apply it to whichever model or data store you're using:

* Collect the data from the request
* Create a new object with that data
* Use a model or other to store it
* Redirect to a get request

The redirect is a new thing. The create route shouldn't actually show anything to the user, it simply performs an action. So when we're done we'll send the use back to one of our GET routes. This also has the benefit of stopping the user from hitting the refresh button and creating new posts every time.

Add the following to your CREATE controller:

```javascript
function createPost(req , res) {

  // data is gathered by body parser and placed in req.body
  
  // create a new post object with that data
  var post = {
  	id: posts.length, 
  	title: req.body.title,
  	body: req.body.body
  }
  
  // store the post in our posts array
  posts.push(post);
  
  // redirect the user to a GET route. We'll go back to the INDEX.
  res.redirect("/");

}
``` 

You now have a fully function NEW/CREATE route. You can add as many new posts as you like.

## Editing

We have deliberately left the EDIT/UPDATE route untill last because it's easiest to understand once we've created a simple NEW form.

The EDIT form, in nearly all cases, will be the same form as the NEW form. It's not always true, but most of the time we can reuse our NEW form and just add a few bits to make it work in both situations. There are three parts that will change from NEW to EDIT:

* The path
* The verb
* The starting values of the inputs

Let's look at how we can cleverly make a single form that will work for both routes:

### Form partial

Firstly, our form is sitting in the NEW template. If we're going to reuse it that won't do. Let's pull it out and put it in a partial.

```bash
touch views/posts/form.js
```  

Pull the form HTML out of your NEW template and place it in the form template. Then we'll include the form in our NEW  and EDIT templates. Your three files should now look like this:

NEW
```html
<h1>New Post</h1>

<% include form.js %>
```

EDIT
```html
<h1>Edit Post</h1>

<% include form.js %>
```

FORM
```html
<form action="/" method="POST">
  <input type="text" name="title" placeholder="Enter a title">
  <textarea name="body"></textarea>
  <input type="submit" value="Save Post">
</form>
```

If you click on either the "New Post" link or an "edit" link on a post you should now see the same form.

### Making the route work for both

#### Path

The NEW and EDIT forms send their data to different routes. The CREATE route has a path of "/" which is easy enough. The UPDATE route on the other has a path of "/:id". So we need to add the post id to the path. Let's do that and then see what the fallout is.

In the form tag in the form template:

```html
<form action="/<%= post.id %>" method="POST">
...
</form>
```

We can use our ice cream cones to print out the post id at the right point. But, oh dear, we're gonna need to change a few other things to make this work. Because we're telling our template to use the post object ***both*** the NEW controller and the EDIT controller will need to provide a post object to the template or we'll get an error.

In the EDIT controller this makes sense. We can load a post ***exactly the same way*** that we did in the SHOW route and pass that in. Let's do it:

```javascript
function editPost(req , res) {

  res.render("posts/edit" , {
    title: "Edit Post",
    post: posts[req.params.id]
  });

}
```

Excellent. Our edit route now has a post object with an ID that it can use in the path. Reload an EDIT page and inspect the form in the browser. You should see that the path in the form is now "/1" for a post with ID 1 for example.

But the NEW route is still broken! It doesn't have a post object to print out so it throws an error. So we need to give it one too. But we don't want to load one here. It's supposed to be a new post. 

The solution is actually pretty simple. Let's just create an empty post object ourselves and pass that in. It will have a blank ID so it won't show in the path!

In the NEW controller function:

```javascript
// NEW - GET /new
function newPost(req , res) {

  // create an empty post
  var newPost = {
  	id: "",
  	title: "",
  	body: ""
  }

  res.render("posts/new" , {
    title: "New Post",
    post: newPost
  });

}
```

If you look at the path on the form on a NEW page you'll see that it's "/" which is exactly what we want!

#### Method/Verb

Making the method work for both is a bit trickier for one simple reason. Forms can't send PUT requests! This is one of those "forms are a bit behind the times" things we mentioned earlier. Forms can only take GET or POST as a verb to send in the route.

So we need to do two things:

* Switch the method from POST to PUT if we're editing
* Make forms send a PUT somehow


##### Method override

We'll start with making the form with PUT. This is called "method override" and is a ***very*** common way of solving this problem. And as always there's a middleware package that will do it for us.

The way it works is simple. We put an extra hidden input in our form that will contain the verb we ***really*** want to use and then get express to use that instead of the real verb in the request. Add the following to your form:

```html
...
<input type="hidden" name="_method" value="PUT">
</form>
```
 
We call it _method because that's what the method-override package will look for. Now we need to setup the middleware:

```bash
npm install method-override --save
```

And, as always, we need to tell express to use it in app.js. Unfortunately the way we like to use it happens to be one of the more complicated ways to set it up. Add the following to app.js ***after the body parser*** but ***before your router*** and then we'll look at what it's doing:

```javascript
var methodOverride = require('method-override');
...

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
```

That's a lot of code. But luckily for us it's copied and pasted from the method override documentation. So you'll never have to write it yourself. Here's what's happening:

* Look in the request body for a parameter called _method
* If it exists delete it ( we don't want it messing up our actual data )
* Swap the current method ( POST ) for the value of _method

If you reload your EDIT page now and submit the form you'll see that we end up on the UPDATE route.

##### Switch between PUT and POST

So this gives us one final problem to solve. We don't want this method override on our NEW route. POST will work perfectly fine for that one. So we only want this hidden field present when a post is being edited.

The most common way to check if a post is being edited or is new is to check to see if it has an id. If it has an ID it's an existing post and is being edited.

So let's do a check in our form and decide wether to put the hidden field in or not. Ice cream cones to the rescue:

```html
...
<% if(post.id != "") { %>
<input type="hidden" name="_method" value="PUT">
<% } %>
```

### Populating the form

We have one last bit to add. When we edit an object in a form the form isn't usually blank. It starts with the values of the thing we're editing. So let's use the post object and some ice cream cones to fill in some starting values for the fields. In the form template:

```html
  <input type="text" name="title" placeholder="Enter a title" value="<%= post.title %>">
  <textarea name="body"><%= post.body %></textarea>
```

That's it. Refresh the page and you should see you starting values in the form now.

> QUESTION ( 5 Mins ) : Why won't this break the NEW form?

This also works perfectly well with the NEW form because the post object on that route has empty values. So the form is blank too. How clever!

## Updating

The last bit to do is to actually make the UPDATE route work. It's really very similar to the CREATE route except that because we're editing an object we have to replace an existing one instead of adding a new one. Again it's far more important to remember the process rather than the actual code because we're using our cheaty array as a data store:

* Load the object that's being edited
* Update it's values with data from the request
* Save the object
* Redirect to a GET route

Hopefully you'll see that code is very similar to things we've done already. We're just tweaking. In the update controller add the following:

```javascript
  // data is gathered by body parser and placed in req.body
  
  // get the post object from our data store
  var post = posts[req.params.id];
  
  // update the values of the object with data from the request
  post.title = req.body.title;
  post.body = req.body.body;
  
  // save the post back to our data store ( at the spot it came from this time )
  posts[req.params.id] = post;
  
  // redirect the user to a GET route. We'll go back to the INDEX.
  res.redirect("/");
```


## Summary

You just:

* Saw how to collect and send data with a form
* Learned how to use body parser to get express to package up the form data for you
* Created the NEW/CREATE and EDIT/UPDATE routes
* Saw the patterns for creating and updating data
* Saw how to use method override to make up for Verbs missing from forms

















 

















l