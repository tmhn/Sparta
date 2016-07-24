# Closures

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Functions
* Scope

## This lesson covers

* Passing functions as variables
* Declaring vs Calling
* Functions remember their scope
* Examples

***

Closures are not available in every language but they are available in javascript. Many people laugh when they're asked to explain closures. It can be like explaining the offside rule. When it's poorly explained it sounds complicated. Luckily there is a very simple way to understand it. 

**Whatever a function can see when it's declared it will be able to see when it's called**

This is linked directly to scope so to put it another way:

**A function retains it's original scope no matter where it's called from**

Let's examine this a bit further. We need to establish a few things first.

## Passing functions as variables

One very common way closures come in to play is when we pass functions in to other functions as if they were variables. We can also return functions as variables aswell.

```javascript

function sayHello() {

	console.log('hello');

}

function funcCaller(funcToRun) {

	funcToRun();

}

funcCaller(sayHello);

```

Copy this in to your console and try it out. What do you expect to see?

In javascript it is very common for us to ***give*** functions to something else to call when they are ready. A timer is a good example. 

```javascript

function onTimerComplete() {

	console.log('timer finished');

}

// set a countdown for 3000 milliseconds then run the function
setTimeout( onTimerComplete , 3000 );

```

Try this in your console too. setTimeout is a built in javascript function that performs a countdown and then calls a function when it's finished. Good example.

## Declaring vs Calling

Now let's define some important terms for functions. 

### Decalaration

A function is **declared** when it is created. Like this:

```javascript
function onTimerComplete() {

	console.log('timer finished');

}
```

As we discussed in the scope lesson, code can see out but not in. So if we have this:

```javascript
var message = "timer finished";

function onTimerComplete() {

	console.log(message);

}
```

someFunction can **see out** to someVariable. This is all decided when the function is declared.

### Calling

The rule of closures says that no matter where we ***call*** onTimerComplete from it will always be able to ***see*** message.

```javascript

var message = "timer finished";

function onTimerComplete() {

	console.log(message);

}

// let setTimeout call our function for us
setTimeout(onTimerComplete, 3000);

```

So when setTimeout ( which may not be able to see message ) calls onTimerComplete it can still see everything it could see when it was declared. 


## Functions remember their scope

Now that we know the difference betweem declaring and calling we can say the following.

**functions remember their scope from when they were declared even if they are called from a different scope**

To understand this fully let's look at some more examples.

## Examples

### Counter function

```javascript

	function createCounter() {
	
		var total = 0;
		
		// this anonymous function is return by createCounter
		return function() {
		
			total++;
			return total;
		
		}
	
	}
	
	var counter = createCounter();
	
	// counter here is actually the function that was returned so we can call it
	counter();
	counter();
	counter();
	var total = counter();
	console.log(total);

```

> DISCUSSION 15 Minutes: What do you expect total to be here. Discuss how the closure has been used here.

Let's try and explain what's happened here: 

* The create counter function creates a second function that increments a variable. 
* It creates a variable called total
* Total is not visible from outside the function
* It ***declares*** a function that increases total by one.
* It then returns that new function and we store it in counter.

This new function remembers everything it could **see** when it was declared. In this case it could see the total variable. Because of closures that function will ***always*** be able to see the total variable and can act on it. It is now the ***only*** thing that can see total. So the total is nice and private.

So when we start calling counter() it can access it and return it. 

### for loops and self-invoking functions

This is a common but quite advanced example. Closures can often help solve a scope problem with loops. Here's an example.

```javascript

for ( var i = 0 ; i < 10 ; i++ ) {

	setTimeout(function() {
		console.log(i);
	} , (i * 1000) );

}

```

> QUESTION 5 Minutes: What do you expect the code above to do? What does it actually do? What is the problem?

Here's what we expect to happen:

* The loop runs and creates 10 timeouts
* "i" increases by 1 each time
* The timeouts are 1 seconds , 2 seconds , 3 seconds etc
* When each is finished it should log the value of i
* We expect it to log 0,1,2,3,4 etc
* We actually see 10,10,10,10,10 etc

The reason we get nothing but 10s is because all the functions that are declared in the loop can ***see*** the ***same*** "i" variable. And when the loop is finished running "i" equals 10. The functions don't get ***called*** until later so when they are called the loop has changed already changed the value of i.

We need each function to **stop** using i in it's closure and to make a copy of it so that it's not the same as the rest. for this we can use a self invoking function that returns a nested function to create a closure. 

```javascript

for ( var i = 0 ; i < 10 ; i++ ) {

	setTimeout((function(j) {
		return function() {
			console.log(j);
		}
	})(i) , (i * 1000) );

}

```

This may seem quite complex but here's whats happening:

* the outer function is self invoking which means it runs as soon as it's declared
* it takes a parameter which is called j
* we give it i ( this forms a closure around the current value )
* the function returns an anonymous functions which gets called later by setTimeout
* this anonymous function now has it's own variable that stores the value of i as it was when it was created

This last example might well be the reason why people laugh when they have to explain closures.

## Summary

You just:

*  Learned the difference between declaring and calling
*  Saw that functions can always see what was in their scope when they were declared
*  Saw how to use closures to make a counter
*  Saw how closures and self invoking functions can help you avoid problems in loops.








 

















