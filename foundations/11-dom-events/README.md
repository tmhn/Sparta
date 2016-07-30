# DOM Events and Listeners

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Objects
* Functions
* The DOM

## This lesson covers

* DOM Events
* The event object
* this
* Bubbling and Capturing


***

We can use the DOM to investigate the page and to make changes. But up until this point we haven't seen how we can respond to the actions that the user takes. Our code lacks some interactivity. 

For example it would be good to know in our javascript when a user clicks a button, submits a form or moves the mouse etc etc. These are known as events. And we can ask javascript listen out for them and to run code in response. 

## DOM Events

Let's look at some of the more common DOM events and how to listen for them. We need three things to listen for an event.

* The element that will fire the event
* The type of event to listen for
* The code to run when the event occurs



### Click events

Click events occur when the user puts the mouse over an element and left clicks. Any element can receive a click event. Although it usually makes most sense to use buttons and links as the user will understand that they are clickable. Here's how to add a click listener.

```javascript
// get the element that will fire the event
var myButton = document.getElementById("myButton");

// add an event listener for click
myButton.addEventListener("click" , function() {

	// the code to run when the event occurs
	console.log('Button was clicked');

});
```

You can see that we've introduced a new method that is available on every element, addEventListener.

This method takes two required arguments and a third optional that we haven't used here. 

The first is the name of the event to listen for as a string. In this case "click". There are many more.

The second is the function to run when the event occurs. This function is given a special name. They are known as callbacks. They are no different from other functions. Calling them callbacks simply states that they are called in response to something happening.

In the example above we have passed an anonymous function in to addEventListener as a callback. But you can also pass in named functions if you prefer.

```javascript
// get the element that will fire the event
var myButton = document.getElementById("myButton");

// add an event listener for click
myButton.addEventListener("click" , handleClick); 

function handleClick() {

	// the code to run when the event occurs
	console.log('Button was clicked');

}
```
 
> NOTE: handleClick is not called when it is given to addEventListener ( no ()'s ). It is given by name to be called ***later***. If we put the parentheses on it it would be called immediately and it's ***return*** value gets given to addEventListener. This is a common mistake but can also be useful. Keep an eye out for it.

There are good reasons for using either format in terms of organising your code.

> DISCUSSION ( 5 Minutes ) : Copy the code above in to the index.js and try refreshing the page. Does the code work? What errors do you get? ( This leads on to the next section )

### DOMContentLoaded

You may remember from our lesson on the ways scripts can be included on the page that we often put our code at the bottom of the page. This is done so that the page has finished loading before we run it. This becomes particularly important when we are accessing DOM elements.

You should have got the following error in the previous section.

```javascript
Uncaught TypeError: Cannot read property 'addEventListener' of null
```

This error occurs because we are trying to get the button element at the top of the page. At this point, it hasn't been created yet, it's null. So when we try to call addEventListener on it we get an error stating that 'null' doesn't have a function called addEventListener.

We need to wait for the page to load. For this we have the DOMContentLoaded event. This event only works on the document.

```javascript
document.addEventListener('DOMContentLoaded', function(){

	console.log('This code is run when the page is finished loading and all the elements are available');

});
```

> EXERCISE (5 Mins) : Copy all the previous code inside the DOMContentLoad callback and see if it works this time.

### submit

We very commonly use javascript to check forms to see if they are valid ***before*** submitting them. We can use the submit event for this. Copy the following into the index.js inside the DOMContentLoaded callback.

```javascript

// get the form 
var myForm = document.getElementById('myForm');

// set the listener
myForm.addEventListener('submit' , function() {

	console.log('the form was submitted');

});

```

> DISCUSSION ( 5 Mins ) : With the code above in the index.js what happens when you click the submit button? It may not be what you expect.

The eagle eyed among you might see that 'the form was submitted' will flash in the console briefly before you are taken to another page. This is because the click listener doesn't actually stop the form from submitting and therefore taking us off to another page. 

If we want to stop the form submitting we need access to the event itself so we can stop it from doing what it's designed to do.

## This

One extremely useful feature of event listeners is that they change the ***context*** of the function to the object that recieved the event.

That may sound complex but quite simply it means that if you use the "this" keyword ( like we have done in our objects lesson previously ) inside an event listener function it will refer to the object that was clicked, or hovered over etc.

Copy the following code in to the index.js:

```javascript

var button1 = document.getElementById('button1');

button1.addEventListener('click' , function(event) {

	console.log(this); // this will display the button1 element

});

```

This is really useful because it allows us to write generic listeners that can be set in loops for example. Look at the HTML. There are many buttons all with the same class. If I wanted to set the same listener on each one and have it respond with some information about that element I could do the following:

```javascript

var buttons = document.querySelectorAll('.myButtons');

for (var i = 0; i < buttons.length; i++) {

	var button = buttons[i];
	
	button.addEventListener('click' , function(event) {
	
		console.log(this.value + ' was clicked'); // this always refers to the button that was clicked
	
	});

}

```

## The event object

The event object is available to every event listener and it contains all the information about the event that was fired and some useful methods too.

We haven't seen or used it so far so let's use it now by adding an argument to our callback functions. Copy the following over the top of the previous code.

```javascript

// get the form 
var myForm = document.getElementById('myForm');

// set the listener
myForm.addEventListener('submit' , function(event) {

	// the event object can be used to stop the default behaviour of the browser
	// this will stop the form from submitting until we're ready
	event.preventDefault();
	
	// log the event to see all the information that was available in it
	console.log(event);

});

```
The only difference here is that we've added an event argument to our anonymous function. You can call this anything you like just as usual. The event listener has been trying to pass this event object it in but previously it hasn't had anywhere to go. Now it does.

We can now do our form checking before allowing the form to be submitted. We can stop the default action of an event, in this case submitting the form, by using the preventDefault method on the event object.

```javascript

// set the listener
myForm.addEventListener('submit' , function(event) {

  // the event object can be used to stop the default behaviour of the browser
  // this will stop the form from submitting until we're ready
  event.preventDefault();
  
  // check the name field to make sure it's valid
  var firstnameField = document.getElementById('firstname');
  
  // make sure the field has a value
  if(!firstnameField.value) {
  
    // show a message to the user
    console.log('You must enter a first name');
    
    // stop the code here
    return;
    
  }
  
  // all checks passed so we can submit our form with javascript
  myForm.submit();


});

```

# Event bubbling and capturing

HTML has a hierarchy. This means that some elements can sit on top of other elements. So the question is if I have a stack of elements, and I click on the top one, which item receives the event? The top one? The bottom? All of them?

This is where event bubbling and capturing comes in. What happens by default is that events travel ***up*** the DOM tree to the top most level. This is called bubbling.

### Bubbling

If you look at the code you will see that the three divs in the html are nested one inside the other. Each one also has a click listener attached. 

> DISCUSSION ( 5 Mins ) : Click on each div in turn and look at what is printed to the console. Can you see what is happening?

You should see that when you click on div1 only the top most event listener is fired. If you click on div2, the listeners for div1 AND div2 are fired. And if you click on div3 all three are fired. The event has ***bubbled*** up through the dom to the top. 

If we had an event listener on the document, the body or even the window they would have fired as well.

### Capturing

Oddly enough, bubbling is actually the second phase of the events travel. It first travels from the window ***down*** through the elements before bubbling back up. This is called the capturing phase. 

Event listeners by default ignore the capturing phase but we can choose which phase we want to listen for. We said earlier that the addEventListener function actually take three arguments. The event to listen for, the function to run and finally the phase. 

If we want the event to fire on the capturing phase we set the third argument to true.

```javascript
div1.addEventListener('click' , function(event) { 
	console.log('div1 clicked') 
} , true);
```

> DISCUSSION (5 mins) : Try setting the capturing phase on each of the three event listeners. Click on the divs and see how the order changes. What would you expect to see if all three are set and div3 is clicked?

### Preventing bubbling and capturing

Bubbling and Capturing are useful but they can also be annoying. What if we don't want it to bubble or capture? We can use the stopPropagation method on the event object to stop the event from going any further.

Try adding the following to each one of the event listeners in turn. See where the event stops.

```javascript
div1.addEventListener('click' , function(event) { 

	// stop the event from bubbling or capturing
	event.stopPropagation();

	console.log('div1 clicked');
	
});

```


 
## Summary

You just:

*  Learned that the browser fires events when things happen
*  Saw that we can listen for those events and run code ( callbacks ) when they occur
*  Saw how events travel up and down through the hierarchy of elements
*  Learned that 'this' refers to the element that was clicked ( and other events ) inside a callback function.
*  Learned how to stop the default actions for events








 

















