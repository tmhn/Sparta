# Building A RESTful Application

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites
* Intro to Node
* Intro to Express
* Templating
* REST, CRUD

## This lesson covers

* Pulling it all together
* MVC
* Method overrides

We're going to build our first application using Node. Because Node is such an unrestricted technology you could build you app in an almost infinte number of ways. But we're going to use some common patterns that have been proven to be effective and work together very well.

The process 

## The first five routes

If we're building a RESTful web application, which is a good pattern to follow, we'll need to be able to perform our five CRUD actions.

* CREATE
* READ ( there are two of these , index and show )
* UPDATE
* DELETE

Each route is going to be a combination of three things.
 

## Build

We'll be starting from scratch so let's create a new npm manifest:

```bash
npm init
```

As always, hit enter to give all default values. We're going to use a few packages that we've already seen so let's install them now. We'll be using:

* express
* ejs
* ejs layouts

```bash
npm install express ejs express-ejs-layouts --save
```

We'll be adding more packages later as we need them but this is a good start. We'll also need our app.js:

```bash
touch app.js
```

Let's get the basic express app set up and the server listening in app.js:

```javascript
var express = require('express');
var app = express();


app.listen(3000 , function(){
	console.log('app is listening on port 3000');
});
```

 
## Summary

You just:

* Learned how to create and render templates with EJS
* Learned how to use placeholders in the templates and to inject variables
* Saw that we can run code in the templates to create loops
* Saw how to split commonly used template parts in to partials
* Saw how to create a layout that is used by all templates for their shared parts

















 

















