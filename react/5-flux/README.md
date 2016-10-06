# Flux

## Timings

This lesson should take between 90 and 120 minutes to complete.

## Pre-requisites

* Intro to react
* Components
* Loading Data

## This lesson covers

* Flux rules
* Dispatchers
* Getting components to share data
* Loading data

Flux is not a framework. Flux is a design pattern just like MVC. This means that we are free to implement the rules of flux in our own way but we still have to follow the rules. The rules help us to create a pattern like this:

## Dispatchers

We've used callbacks in previous lessons for communcating between parent and child. But what if we want to communicate with parts of the app that are not easy to reach with callbacks?

Flux allows us to pull in a global ( Really?? yes really! ) , shared object called a dispatcher. The start of the pattern is that every component sends messages through this single dispatcher. So lets' build one. We need to install the flux package and create some folders first:

```bash
npm install flux --save
mkdir js/dispatchers
touch js/dispatchers/appDispatcher.js
```

> NOTE : Notice that we're back to normal js files again

Our AppDispatcher is actually very simple:

```javascript
var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

module.exports = AppDispatcher;
```



## Summary

You just:

	* Learned that React helps us to split code in to reusable chunks
	* Learned how to create a component
	* Saw how we can use require and exports to pull one component in to another
	* Saw how to pass data between components









