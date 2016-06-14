# Loops

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Arrays
* Booleans
* Truthy/Falsey

## This lesson covers

* for loops
* while loops
* do while loops
* for in loops

***

Any time we want to perform an action more than once we're going to use a loop. There are several types and they're create in different situations. Ninety nine percent of the time we will be using loops to work with arrays. 

## For loop

The for loop is one of the most widely use loops in almost every language. The for loop needs to know four things.

* What to do before the first loop runs
* When we should stop looping
* What we should do at the end of each loop
* What to do on each loop

A basic for loop looks like this:

```javascript
	
for( var i = 0; i < 10; i++ ) {

	console.log('this is loop ' + i);

}

```

> EXERCISE ( 5 Minutes ) : See if you can figure out which parts of the loop match with our four requirements in the list


Let's look at the parts of the loop:

#### Set the starting values

```javascript
var i = 0;
```

The first argument to the for loop is what do before the first loop is run. In this case we created a variable called "i" and setting it to 0. 

While we could have chosen to do ***anything*** at the start of the loop this is a very, VERY common way to use a for loop. Right down to calling the variable "i". 

We are going to use "i" to keep track of our position in the loop and as a test to see if we should stop looping.

#### Should we keep looping

```javascript
i < 10;
```
Whatever we put in the second position is the check that will be performed after each loop. In this case, is "i" less than 10?

We can, again, put anything we like in here. But it must evaluate to truthy or falsey. As soon as it's falsey the loop stops running. 

According to this when will we stop looping?

#### What should we do after each loop

```javascript
i++;
```

This is a nice trick that means "increment i by one". Or in other words, increase i by one after each loop.

So each time the loop runs i gets closer to 10. And closer to failing the i < 10 test. That's when the loop will stop.

#### What to do on each loop

```javascript
{
	
	console.log('this is loop ' + i);
	
}
```

Arguably the most important part of the for loop. The block {} is what we want to do on each loop and it's entirely up to you. It will obviously depend on what you're trying to build. 

Here we simply log the message and the current value of i to the console as an example.

Copy this loop in to your console and run it. What do you expect to see?

> EXERCISE ( 10 Minutes ) : Write a loop that prints the numbers between 1 and 20 inclusive.

We said before that loops are mostly used with arrays. Let's use our for loop to print all the values in an array.

```javascript
var my_array = ["Steve" , "is" , "great"];

for(var i = 0; i < my_array.length; i++) {

	console.log(my_array[i]);

}
```

Notice we've chosen to use the length of the array to test for when we should stop looping. 

Also notice that we can use i in our code. We use it each time to ask for the next item in our array. 

If we wrote this without a loop it might look something like this:

```javascript
var my_array = ["Steve" , "is" , "great"];
var i = 0;

// i = 0
console.log(my_array[i]);
i++;

// i = 1
console.log(my_array[i]);
i++;

// i = 2
console.log(my_array[i]);
i++;

// i < 2 == false. Stop here

```

## Summary

You just:

* How to use a for loop to work on every element in an array







 

















