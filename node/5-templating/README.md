# Templating

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Intro to Node
* Intro to Express
* Middleware

## This lesson covers

* What is templating
* EJS
* Template variables

In the previous lessons we've used one simple method to decide what to send back   in our response. 

```javascript
res.send("<h1>Welcome</h1>");
```
It's pretty clunky working this way. Returning an entire page full of HTML in this way would be awful and very difficult to manage. What would be great is if we could have our HTML in a separate file and tell express to return that.

That is entirely possible and sometimes we do exactly that using express static. But as the name suggests, it's not very dynamic. The html would be the same every time. What if I want to change the user's name on the page or display a list that's saved in a database?

This is where templating packages come in. They allow us to mix a little bit of HTML with some code in a template file to make something dynamic but also easy to manage. 

There are quite a few of them out there but we're going to use one called EJS. 

> NOTE : Express comes with a templating engine built in called Jade. Quite frankly it's horrible ( personal preference, not sorry ). It doesn't use standard HTML and is a whole new thing to learn for no benefit. That's why we're going for EJS. 

## EJS

EJS is a module for express. It adds a few methods to our response object that allow us to render templates. So instead of res.send now we can use res.render instead to render a template.

The templates are the really interesting part. EJS templates are basically HTML. But they also allow us to specify "placeholders". These essentially tell the renderer "I don't know what's going in here yet but I'll tell you later". 

EJS will run through your template, plug in all the missing bits ( which you give it when you've decided what they are ) and then return you some finalised html that you can send back as response.

Let's take a look.

## Installing EJS

EJS is just an npm package like any other so let's install it. Open the start code and type the following in the terminal:

```bash
npm install ejs --save
```

We now need to tell express to use EJS as our templating engine. We have a new method for that. Add the following to app.js:

```javascript
app.set('view engine', 'ejs');
```
 
Express has global parameters, one of which is which view engine ( renderer ) to use. To change these parameters we use the set method. Express will load the module for us internally. We don't need to require it or use it at all. It's now ready to go!

## Creating templates

### Templates

We need a directory to hold our views ( templates ). We'll also need a template file to work in. So let's create them now:

```bash
mkdir views
touch views/index.ejs
```

> IMPORTANT : EJS looks for templates in the views directory by default. It can be changed but make sure you call your directory "views" otherwise.

Notice the file type for these files is .ejs not .html. 

Let's open index.ejs and add some basic html:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Homepage</title>
</head>
<body>
   <h1>Welcome to the homepage</h1>
</body>
</html>
```

### Rendering

Now we need to create our homepage route and render this template. In the app.js type the following:

```javascript
app.get("/" , function(req,res) {
	
	res.render("index");
	
});
```

Previously, we've use res.send to return a response. But now, thanks to EJS, we have a new method called render. 

This render method does a few things. Firstly, it will look in the default templates directory ( views ) for a file called "index.ejs". It knows that it will be an ejs file so we can leave that part off. It then reads that file and turns it in to HTML. Finally it returns the HTML as a response.

Start your application and point your browser at:

``http://localhost:3000``

You should see your html rendered on the screen! 

### Template variables

But we still have a small problem. It's still a totally static page. We might as well have just returned an HTML file instead! We want some dynamic stuff in there. 

Let's create some placeholders for dynamic data. In the index.ejs file add the following:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Homepage</title>
</head>
<body>
	<nav>
		Welcome back, <%= username %>
	</nav>
	
   <h1>Welcome to the homepage</h1>
</body>
</html>
```

The tags around "username" are sometimes called ice cream cones. Different templating engines use different things to say "hey, this bit isn't HTML. You need to render this". EJS uses the cones. 

Notice the equals sign. The equals sign tells the render to insert the value of the username variable at that spot. We'll look at the other types of cones in a minute.

If you reload your page right now you'll get a nasty error. 

``username is not defined``

That's because we've left a space for username but haven't told the renderer what it is yet. We do that in the route when we render the template. Open app.js again and make the following change:

```javascript
app.get("/" , function(req,res){

  res.render("index" , {username: "Steveyblam"});

});
```

The second argument to the render method is an object that contains all the info that needs to be "plugged in" to the template. You can put as much or as little data in here as you like. But you have to fill ***every*** placeholder in the template. If you miss one you'll get an error.

Reload your page and take a look now.

You may, rightly, be thinking that this still isn't very dynamic but in the future we'll be changing where we get the username or other data from at this stage. We could load it from a database, or from an API etc.

> EXERCISE ( 10 Mins ) : Add another placeholder to your template and make sure the render method has the data it needs to render it.

### Loops

Rendering single variables is all well and good but we very often want to loop through an array of stuff to create lists.

This is where our second tag comes in. EJS will allow us to run code in the template. Let's create a loop in the template. Underneath the h1 tag type following:

```html
<% for(var i = 0; i < posts.length; i++ ) { %>
	
<% } %>
``` 

A few things to notice here. Firstly, no equals sign this time. This standard ice cream cone is the "evaluation" tag. It allows you to run standard javascript functions to help render your template!

Secondly, notice that if we took out all the cones it would just be a simple javascript loop through an array called posts ( so we'll need to put that in to a data ).

So why are we opening and closing the cones? Well the space in the middle is where we would print out whatever we want from the loop. So the cones essentially break us out and bring us back to the HTML.

Let's add some more bits:

```html
<% for(var i = 0; i < posts.length; i++ ) { %>
	<h3><%= posts[i].title %></h3>
<% } %>
``` 

Notice it's just basic HTML inside the loop. But we're back to our equals sign cones again to print out the title from our post.

Let's put some posts in the render data to see if this works:

```javascript
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
```

All we've done here is add in a posts array with a bunch of objects in it. If all goes to plan our template will loop through each one and print out the title.

Reload your page and see what you get.

> EXERCISE ( 10 Mins ) : Try and add a <p> tag with the body data for each post to the template.

You should have something like this:

```html
<% for(var i = 0; i < posts.length; i++ ) { %>
    <div>
      <h3><%= posts[i].title %></h3>
      <p><%= posts[i].body %></p>
    </div>
<% } %>
```

The div isn't entirely necessary to answer the question but it makes things neater.

### Partials

Assuming that we make more than one page for our app there's a good chance we'll be repeating some elements of our HTML. The navigation is most likely going to be reused. 

Rather than repeating this in every template it would make sense to separate it in to it's own mini template. These are called partials. 

Create a new folder inside your views folder called partials:

```bash
mkdir views/partials
```

Now let's create our partial.

```bash
touch views/partials/navigation.ejs
```

Let's pull the navigation area out of our index template and put it in the navigation template.

```html
<nav>
  Welcome back, <%= username %>
</nav>
```

We can now pull this partial in anywhere we need it with the include command. Again notice no equals signs here:

```html
<body>
  
   <% include partials/navigation  %>
  
   <h1>Welcome to the homepage</h1>
   
   ...
```

Make sure you keep an eye on the type of cones you're using. A very common mistake is to miss an equal sign or add one when you don't need one.

## Layouts

Looking at our HTML there are still some parts that are repeated across all templates. The <html></html> tags and the <head></head> tags are a good example.

In fact the only bit that is likely to change from template to template is the content in the body. So if we pull everything out in to a global ***layout*** and inject our templates ***in to it*** we could save even more repitition.

Unfortunately EJS won't do this for us as standard. We need another package called express layouts. And we need to install it first:

```bash 
npm install express-ejs-layouts --save
```

And we need to tell express to use it. Express EJS layouts is middleware so it's included with the use method. Add the following to the top of your app.js:

```javascript
var layouts = require('express-ejs-layouts');

app.set('view engine' , 'ejs');

// include the express layours middleware
app.use(layouts);

...
```

By default ejs layouts will look for a file in the views directory called layout.ejs so let's create that now.

```bash
touch views/layout.ejs
```

Now we should pull all the HTML that's common to all our views in to this file. Copy the following in to layout.ejs:

```html
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
</head>
<body>
  
   <% include partials/navigation  %>
  
   <!-- our template content will be injected here -->
   <%- body %>

</body>
</html>
```

We've introduced a new tag here called body. Notice it has a minus in the cones not an equal sign. This is where the whole of our rendered template will be plugged in.

Notice also that we've made the title tag dynamic too. So we'll need a value for title each time we render.

Let's now remove everything from our index.ejs file that isn't now in the layout. It should now only contain this:

```html
<h1>Welcome to the homepage</h1>

<% for(var i = 0; i < posts.length; i++ ) { %>
	<div>
		<h3><%= posts[i].title %></h3>
		<p><%= posts[i].body %></p>
	</div>
<% } %>
```

We need to add the title to our data in our route as we made it dynamic:

```javascript
 res.render("index" , {
 	   title: "Homepage", 
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
```

EJS will now combine our layout with our template and all the variables and render the page for us.

> EXERCISE ( 15 Minutes ) : Create another template and route for an about us page. The page should have a heading and some text describing what we've built.


 
## Summary

You just:

* Learned how to create and render templates with EJS
* Learned how to use placeholders in the templates and to inject variables
* Saw that we can run code in the templates to create loops
* Saw how to split commonly used template parts in to partials
* Saw how to create a layout that is used by all templates for their shared parts

















 

















