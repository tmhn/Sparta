# jQuery

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* The DOM
* DOM Events
* Functions

## This lesson covers

* Get the code
* The Almighty Dollar
* DOM Ready
* Querying
* Creating Elements
* Adding jQuery goodness
* jQuery elements
* Collections
* Chaining
* Event Listeners


***

You may have noticed that javascript is pretty wordy. If addEventListener isn't bad enough then getElementById certainly is. As you start to write more code you'll realise that javascript isn't perfect. You'll find yourself writing a lot of code that does the same things. It would be really nice if someone simplified some of this stuff. 

When someone writes some code that simplifies common actions it is called a framework. There are many frameworks written for javascript. jQuery, for a long time, has been one of the most popular.

Hopefully by the end of this lesson you'll realise how much easier jQuery makes javascript. We won't cover even half of what jQuery can do. But this lesson should give you some of the basic tools to be able to build a basic app.

## Get the code

jQuery comes in a javascript file just like any that we would write. So we need to include it in exactly the same way. We have some options though:

* get our own copy of the code
* use a package manager
* use a cdn

Getting our own copy isn't great practise because it becomes hard to maintain when the code gets updated.

We haven't discussed package managers yet so we'll leave that for the moment.

So we'll use a CDN. A Content Delivery Network is a set of servers that make sure files are always available. jQuery lives on one of these.

Open up your browser and google "jQuery CDN"

It should be the first result. 

> EXERCISE ( 5 Mins ) Grab the script tags for the  minified version of jQuery 3 and paste it in to the head of the starter code before the index.js file

Refresh the page and make sure you don't get any errors.


## The almighty dollar

jQuery is basically one all singing, all dancing function that does a bunch of things. That function is called $. It's just like any other function but they named it $ to keep it short and to make sure it didn't conflict with any thing else. It exists in the global scope!

```javascript
// this is waiting for one of the following arguments
$(argumentgoeshere);

```

The $() function does nothing just like this.

There are four things this dollar sign function can do that depend on what we give it as an argument.

* Function - Listen for the DOM load event
* String of CSS - Search for elements
* String of HTML - Create elements
* Element - Add the magical jQuery goodness to a DOM element

Let's look at each of these in turn. For each one we'll show you the original javascript version and then the jQuery version so you can see how much simpler it is.

## DOM Ready

We already know how to listen for the DOM to be ready so we can start working with it.

```javascript
// javascript version
document.addEventListener('DOMContentLoaded' , function(event) {

	console.log('DOM is ready');

});
```
If we give the $() a function as an argument that function will be run when the DOM is loaded.

```javascript
// jQuery version
$(function(event) { 

	console.log('DOM is ready'); 
	
});
```

Copy the jQuery version above in to the index.js file and refresh the page. Make sure you can see the message in the console.

## Querying

This is where the real magic of jQuery comes in. We can perform complex searches for elements on the page in a similar way to the querySelector, querySelectorAll and getElementById functions all put together.

We give the $() function a string with a CSS selector in it and it will find everything that matches.

Let's try a few simple searches. 

### Find element by ID

```javascript
// javascript version
var count = document.getElementById("count");

// jQuery version
var count = $("#count");
```

Much shorter.

### Get elements by tag name

```javascript
// javascript version
var items = document.getElementsByTagName("li");

// jQuery version
var items = $("li");

```

### Query by css selector

```javascript
// javascript version
var done = document.querySelectorAll("li.done");

// jQuery version
var done = $("li.done");
```

As you can see each of these examples are much much shorter but there are far more benefits to come.

## Creating elements

So far we've given the $() a function to act as a DOM ready listener. We've given a CSS selector to search for elements. Now we're going to make it do the third thing it can do. Create elements. We can get jQuery to create an element for us by giving it some html as a string.

Let's say I want to add a new li element to our list. Here's how it's done in pure javascript:

```javascript
// create the element
var li = document.createElement("li");

// set the html
li.innerHTML = "New Item";

// get the list (ul)
var list = document.getElementById("list");

// add the element to the list
list.appendChild(li);

```

And now the steps in jQuery

```javascript
// create the li element with the text already inside
var li = $("<li>New Item</li>");

// get the list and add the li at the same time
$("#list").append(li);

```

We could even simplify this further by not using a variable to store the li element. And perhaps we'll add it to the start of the list rather than the end. We change append to prepend.

```javascript
// get the list and add the li at the same time
$("#list").prepend($("<li>New Item</li>"));
```

## Adding the magical jQuery goodness

The elements that are returned from these queries are different from what you would get back from getElementById or querySelector in one very important way. They are "decorated" with jQuery methods and properties. This basically means that each element has a bunch of extra methods and properties that make things a hell of a lot easier to work with. 

jQuery doesn't only work on DOM elements. It can also work on javascript variables. Writing loops is always a pain in javascript so jQuery makes available an "each" function for arrays to do just that.

If you, for some reason, have a DOM element or a variable that has NOT been decorated with jQuery goodness, you can decorate it yourself.

```javascript
// javascript version
var todos = ['Food shop', 'Wash clothes' , 'Pay bills'];

for(var i = 0; i < todos.length; i++) {

	// pull each todo out of the array individually
	var todo = todos[i];
	
	// log it
	console.log(todo);

}

// jQuery version

// add the jquery goodness to the array
$(todos).each(function(index, todo) {

	console.log(todo);

});

```

Now let's look at what jQuery elements can do.

## jQuery elements

Here are a few examples of the extra methods that jQuery makes available to us.

> NOTE : We normally don't assign jQuery elements to variables like we do above just to keep the code shorter.

### HTML

Let's change the text inside the count. Copy the jQuery version in to the index.js each time and see what happens.


```javascript
// javascript version
var count = document.getElementById("count");
count.innerHTML = "5";

// change the count html
$("#count").html('5');
```

### CSS

What about changing the text color? We can use the css method to set any css property.

```javascript
// javascript version
var count = document.getElementById("count");
count.style.color = "green";

// jQuery version
$("#count").css('color' , 'green');

```

There are of course many, many more of these methods available. The jQuery documentation and google are your friend here. If you finding yourself writing any vanilla javascript do a quick check to see if there's a jQuery alternative.


## Collections

Now we come on to one of the best features of jquery elements. The above changes will work whether we apply them to one element or a collection of them. Let's look at an example.

Let's say I want to add a class of "done" to all the li elements. Here's how it's done with pure javascript.

```javascript
// javascript version
var items = document.getElementsByTagName("li"); // returns an array

// loop through each element and add the class for each one
for (var i = 0 ; i < items.length ; i++ ) {

	// get the tag
	var item = items[i];
	
	// add the class
	item.className = item.className + " done" ;

}

```

That IS a lot of code. Here's the jQuery version.

```javascript
// jQuery version
$("li").addClass('done');
```

That's it. jQuery doesn't care whether you get a single element back from your query or a collection of them. It will simply apply any changes you make to everything that comes back from your query.

## Chaining

In the above examples you can see that we've use ``$("#count")`` twice. Once for changing the html and once for change the color of the text.

As jQuery is all about simplfying our code and not repeating ourselves it would be much better if we didn't have to do this twice. But seeing as me don't normally store our elements in variables with jQuery how can we do this?

jQuery has an answer for this. Chaining. 

Chaining is a pattern that is used in other languages too. It basically means that we can keep adding on new methods to the chain and they will all act on the original element. Here's how we could simplify what we've got above.

```javascript
$("#count").html("5").css('color' , '#BBCCAA');
```

These chains can be as long as you like. But it's best not to go overboard.


## Event listeners

Adding event listeners is extremely easy with jQuery as it provides dedicated functions for setting the most common.

```javascript
// javascript version
var button = document.getElementById('myButton');

button.addEventListener('click' , function(){

	console.log('button clicked');

});

// jQuery version
$('#myButton').click(function(){

	console.log('button clicked');

});

```

There is also a generic event listener function in jQuery that works the same way as addEventListener.

```javascript

$('#myButton').on('click' , function() {

	console.log('button clicked');

});

```

We have barely scratched the surface of jQuery so make sure that if you're using it always check for a jQuery way of doing things first before writing a lot of code.

 
## Summary

You just:

*  Learned what frameworks are
*  Learned that jQuery is a more powerful way of working with the DOM
*  Learned how to listen for DOM Ready
*  Learned how to query elements
*  Learned how to create elements
*  Saw how to chain lots of commands together
*  Saw how to create event listeners








 

















