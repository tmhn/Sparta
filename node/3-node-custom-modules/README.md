# Custom Modules

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

* Intro to Node

## This lesson covers

* What are modules for
* A simple module
* Scope
* Require

Modules are used to package up code in to something shareable and reusable. They are very easy to write but are used pretty much everywhere. You'll be writing almost all of you code in modules from now on. So they're a good thing learn.

Put simply, they keep your code separate from the rest of the application. The only thing they contribute to the application is what you choose to ***export***. This will force you to write things in a nice ***encapsulated*** way.

## A simple module

Open the starter code and have a look in the app.js file.

The code is an interest calculator. It gets three inputs from the user ( using the prompt module ) and then calculates the amount you would have after a number of years.

The prompt is actually a good example of complex code that has been separated into a separate module. Getting a value from the user in the prompt is surprisingly complicated in Node. But this module gives us a simple interface. You should be able to see that this module exports ( returns ) an object that has useful methods attached to it.

> QUESTION ( 5 Mins ) : Which parts of our code do you think could be used in other projects? Which would you separate in to a custom module?

Hopefully you will have all agreed that the interest calculation is code that could usefully live by itself. So let's separate it in to a custom module.

Create a new file called interest.js in the same folder as the app.js.

### Basic structure and use

Let's start by making our module do something simple and then make sure we can get it working in our code. Open interest.js and add the following:

```javascript
console.log('my module is loaded. Whoop!');
```

And then at the top of app.js:

```javascript
var interest = require('./interest');
```

You may notice that we've used a ``./`` here when loading interest. This is important. When we load modules that were installed using NPM we can simply use there name and require will looked in the node_modules directory first. When we require our own we must give a path to the file that relates to where we are requiring ***from***.

The path above means "load the interest.js file from the same directory as this file".

Now let's run the app and see if our code was loaded.

```bash
node app.js
> My module is loaded. Whoop! 
```

If we did everything right our module is pulled in and run correctly.

> QUESTION ( 5 Mins ) : What do you think will be in the interest variable in app.js?

Let's look and see what has ended up in ``var interest``.

In app.js, below the previous require statement, type the following:

```javascript
console.log(interest);
```

Run the app again. You should see that interest is undefined. In much the same way that we return data from a function we have to return something from a module for there to be anything in our variable. So let's try that now. Open the interest.js file and type the following at the bottom of the file:

```javascript
module.exports = "I was returned from the interest module"
```

The module object is always made available by node and require. By assigning something ( anything you like ) to the module.exports variable we can return something from our module.

Try running the code again now. You should see that ``var interest`` now contains the string we exported.

### Sort of scope and sort of closures

Each modules code lives in it's own little space in node. This means that one module cannot see the variables or functions in another. You can think of it as each module having it's own global scope. And they cannot see each other.

Let's prove this. Open interest.js once again and type following before the ``module.exports`` line:

```javascript
var shouldbeglobal = 10;
``` 

In normal JavaScript code this variable would be available absolutely everywhere as it's been created in the global scope. Let's see if it's available after we've required the module. In the app.js at the end of the file:

```javascript
console.log(shouldbeglobal);
```

You should be able to see that ``shouldbeglobal`` is ***NOT*** available in app.js. This is because it is kept separate in the interest module and we did not ***export*** it. So modules have their own scope.

But if we can't access this variable how is it useful? Well luckily for us, closures still work. If we export something that can see this variable, it will ***always*** be able to see it.

Let's try this in interest.js. Remove shouldbeglobal and type the following:

```javascript

var name = "Steve";


// now we export a JSON object that has one method. 
module.exports = {
	sayName : function() {

		// say name has a closure around name
		console.log(name);
	
	}
}
```

And in app.js:

```javascript
interest.sayName();
```

Our interest object now contains the object we exported from the module. This object has a single method, sayName. And this method has formed a closure around the name variable inside the module. So we've essentially made the ``name`` variable private and only accessible from inside the module. But we've exported a method that still has access to it.

This is a great way to keep your code clean and only expose the variables and methods that we want people to be able to use.

> EXERCISE ( 30 Minutes ) : Pull the interest calculation code from app.js and move it to the interest module. The interest module should export at least one function that allows us to perform the calculation. The function should return an object that contains the new total and the interest amount. Use your module in the app.js to perform the calculation. 


 
## Summary

You just:

* Saw that node code is often separated in to modules
* Learned that modules have their own scope
* Learned that only what we export from a module is made availed
* Saw how to require a custom module
* Saw how to export objects, functions and values
* Saw how closures can allow us to access private variables in our modules












 

















