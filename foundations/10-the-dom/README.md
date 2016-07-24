# The DOM

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Objects

## This lesson covers

* What is the DOM
* The DOM tree
* Querying the dom
* Creating new elements
* Exercise

***

Javascript was originally built for the browser. Up until this point we've only seen how to use javascript to create the odd alert and print things to the console. What we need is a way for javascript to interact with every aspect of the page including the HTML and the CSS. This is where the Document Object Model comes in.

## What is the DOM

In our objects lesson we saw how to take real life things and represent ( model ) them using code. So a bank account object might have a balance property and a getBalance method that returns it.

The browser is going to do the same thing for us but this time it's going to model the page we're viewing. 

The whole page together is known as the document. It includes all the parts of the page. The html, the css, the browser window; everything. 

It creates a javascript object when the page is loaded that containts all the elements of the page represented by javascript variables and methods. 

The DOM acts as a bridge between the javascript and the page. So any changes we make to our DOM object will appear on the screen and vice versa.

> Any changes we make using the DOM are not permanent. They will disappear if the page is refreshed. They do not alter your code.

## The DOM tree

Because HTML is hierarchical the DOM is too. Each item is represented by a special type of object called an element. Elements are basically objects that are tied to things on the page. Each element can contain one or more other elements. This is known as a parent child relationship and forms a tree like structure. Each part of the structure is also called a node. 

You may hear the words element, object and node used interchangeably although node and object are actually more general terms.

The very top level of this tree is an element called document. The document object is always available in javascript that runs in a browser.

The easiest way to understand this is to take a look. Open the starter code in your web browser and type the following in to the console.

```javascript
console.log(document);
```

You should see the html much the same as it appears in the elements tab. Let's start to move through the dom and look at what's available. This is called  traversing the dom.

We can leave out the console.log now. Type the following in to the console

```javascript
document.body;
```

Notice that we are using the same notation we used to access properties on an object to move down to a child of the document. In this case, the body tag.

document.body is an element. As we said before elements are just objects that are tied to the page.

Let's see what this element can tell us about the body. Type this in to the console:

```javascript
document.body.children;
``` 

The children property is a javascript array of all the child elements of the body tag. You can see that the children of the body tag are in the array.

> QUESTION (5 Mins) : Given that the children property is an array. How can we get the h1 tag specifically?

Try this: 

```javascript
document.body.children[0]; // the h1 element is the first element
document.body.children[0].innerHTML // the html inside the h1 element
```

> QUESTION : How about getting the html from inside the first li element in the div? Can you change it?

```javascript
document.body.children[1].children[0].children[0].innerHTML; // read it  
document.body.children[1].children[0].children[0].innerHTML = "I have changed"; // change it
```

Hopefully you can see by now that trying to work our way through the DOM in this fashion is a bit cumbersome. Plus it means you have to know exactly what the state of the DOM is before you can move through it.

There is a better way.

## Querying the DOM

The DOM comes with some built in methods that will help us to find things. Let's have a look at some of them.

### getElementByID

Pay close attention to the capitals in this one. We can give elements on the page IDs to make them easier to find with javascript. Notice that the div tag has an id of wrapper. Try this:

```javascript
var wrapperDiv = document.getElementById("wrapper");

wrapperDiv.style.backgroundColor = "blue";
```

### getElementsByTagName

We can also search by the type of html tag. Notice that while the previous method returns a single element this one will return an array of all matching elements.

```javascript
var lis = document.getElementsByTagName("li");

lis[1].innerHTML = "Im an LI and i've changed";
```

### querySelector and querySelectorAll

These methods allow us to search for elements using their CSS notation. That means whatever we would write to target tags using css we can use here to get the elements.

querySelector returns the first element that matches whereas querySelectorAll returns an array with all the elements that match.

This example will find every li tag that also has a class of 'selected'. Even if there is only one element returned.

```javascript
// li.selected is CSS notation
var selected = document.querySelectorAll('li.selected');

// turn them all red
for ( var i = 0 ; i < selected.length ; i++ ) {
	
	selected[i].style.color = "red";

}
```
 

## Creating new elements

Not only can we edit elements that are already on the page we can create completely new ones too.

There are three steps to creating a new element

* Create a blank element
* Add styling or content if needed
* Push it into the DOM

```javascript
// create a new blank <p> tag
var ptag = document.createElement('p');

// add some styling/content
ptag.innerHTML = "A brand new ptag";

// push in to the DOM
document.body.appendChild(ptag);

```

There are two things to note here. 

* The new element only appears on the screen when you append it
* The element will be appended to the element on which the append method is called. In this case body.

These are only a few of the many many methods and properties that are available for working with the DOM. 

Don't forget, Google is your friend.



## EXERCISE ( 30 Mins )

> NOTE Work in the index.js file. 
> You may need to google some of the following tasks

* Write some code in the addListItem function that creates an element and appends it to the list.
* Use a loop to create and append li elements for each name in the listItems array
* Set the class of every other list item to be "even"
* Set the count span to be the number of list items.

 
## Summary

You just:

*  Learned that the DOM is an object that represents all aspects of the page
*  Saw how to access the DOM using javascript
*  Saw some of the methods use to find things in the DOM
*  Saw some of the properties we can change








 

















