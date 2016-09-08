# Integrating with the frontend

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Express
* Routes
* CSS

## This lesson covers

* Where does frontend code fit in
* The public folder

Our app is working quite nicely so far. But it looks awful. It's time to fix that.

In the foundation module we spent all our time learning how to write frontend html and javascript and including css. We've spent the whole of this module writing javascript code for the backend. So how do the two mix together? It's actually pretty simple as long as you can keep a good grasp of what's being run where.

We're going to look at how to use all those files that we normally use in the frontend by getting our express to serve them up for us.

## The public folder

Once our app has rendered some html for us all the same rules apply as if it were an HTML file just like the ones we wrote in the foundation module. 

So we can include javascripts, css files, images and videos using <script> tags, <link> tags etc. But we need to know where these files are. Express is in control of which routes give us something back now. And so far it only responds to the seven RESTful routes we told it to respond to.

We need to tell express to send back files when we ask for them too. To do this we're going to create a folder called public and fill it with all the static files we want to be available. This will in many ways act as the "frontend" of our app and contain all our javascript,css and images etc.

> NOTE: The starter code already has a folder called called public and public/images. We did it for you so we could give you the images we're going to use later. 

Create two more directories in the public folder:

```bash
mkdir public/js
mkdir public/css
```

The next step is to tell express that the first thing it should do when it receives any request is to check if it's for a file in our public directory. 

This is done with some middleware that comes built in to Express ( so we don't need to install this one ). Add the following line to the top of your app.js under the mongoose.connect line:

```javascript
// open up public as a static folder
app.use(express.static("public"));
```

Let's add some css to our app. Create a global css file in the css folder:

```bash
touch public/css/global.css
```
### Background image

Let's add a nice background image to our app. In global.css add the following:

```css
body {

  background-image:url('../images/fabric.png');

}
```

The fabric.png file is already in the images folder for you. 

> DISCUSSION ( 5 Mins) :How would we normally include this css file? It would normally go in the head of our html. Where is our head now? 

It's in the layout.ejs file. So that's where we'll include our CSS!

Open layout.ejs in the views directory and add the link:

```html
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/global.css" />
</head>
```
Notice that we don't use put "public" in the href here. That's because express is serving up everything inside the public folder as if it were at the root of the site.

### Google fonts

Times New Roman is a truely awful font. Let's add in a google font. Google fonts are just css files that we link to on the google site. So just like our global.css we're going to pull in our google font in the layout.ejs:

```html
...
	<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet">
</head>	
```

> NOTE : If you don't like this font feel free to look up another one on the google fonts website. Just no fonts that look like handwriting. They're not big and they're not clever.

Now let's make it the default font in our global.css:

```css
body {

  background-image:url('../images/fabric.png');
  font-family: 'Oswald', sans-serif;
	
}
```

### Styling

And finally we'll add a touch of padding and some link styling:

```css
body {

  background-image:url('../images/fabric.png');
  font-family: 'Oswald', sans-serif;
  padding:150px;
  
}

a {

  color: #91972A;

}
```

It's starting to look a bit more like an app now.

## Integrating bower

In the foundations model we were using jQuery to write our frontend code and we started using bower to install it. So let's go all in and use bower and npm together in our app! Let's create a bower manifest:

```bash
bower init
```

Hit enter to accept all the defaults.

Now we have a problem. Bower typicall installs it's files in a folder called bower_components. But the only files we'll be able to see from our frontend will be the files in the public folder.

We have two options:

* ask bower to install bower_components inside the public folder
* ask express to open up the bower_components directory as a static folder

Both options are easy. We prefer to move bower_components inside the public folder so all our frontend assets are in the same place but it's really up to you.

To tell bower to install the components somehwere else we need another configuration file called ``.bowerrc``. This is not a typo. configuration files often only have a file type and no name. So let's create that now:

```bash
touch .bowerrc
```

Bower is configured with a JSON object. We want to tell it to use a different directory for installing components. Add the following to the .bowerrc file:

```javascript
{
	"directory" : "public/components"
}
```

Now we're ready to install jQuery with bower:

```bash
bower install jquery --save
```

If you have a look in your public folder you'll now see a folder called components that should have jQuery in it! 

> EXERCISE (10 Minutes) : Create a javascript file called global.js in the js folder and include it in the head. 


PERHAPS FRONT END FORM VALIDATOR WITH JQUERY

## Summary

You just:


