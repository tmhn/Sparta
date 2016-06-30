# Loops

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Arrays
* Object Basics
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

## While loops

The while loop is the simplest loop there is. It keeps running until a test we give it returns false. The loop checks the test first then decides whether to run or not. It looks like this:

```javascript
var i = 0;

while ( i < 5 ) {
	
	console.log('this loop has run ' + i + ' times');

}
```

The loop tests for i < 5 each time. As soon as it's false the loop stops. 


> QUESTION ( 5 Minutes ) : As it stands will this loop ever stop?

Hopefully you have spotted that because i never changes i < 5 will always be true. So the loop carries on forever. This is called an "infinite loop". It's a great way to crash your browser too. Let's fix it.

```javascript
var i = 0;

while ( i < 5 ) {
	
	console.log('this loop has run ' + i + ' times');
	i++;
}
```

We tend to use for loops when we have a fixed number of loops we want to run. The while loop is better when we're waiting for something to be true. Although you can easily use either of them in both situations.

## The do while loop

The do while loop is the same as the while loop with one difference. The while loop checks first then decides if it will run the loop. This means that it's possible to have a while loop that doesn't run at all if the condition starts out as false.

The do while loop ensures that at least one iteration of the loop will run before checking the condition.  It looks like this:

```javascript
var number;
do {

	number = Math.random(); // random number
	console.log(number); // this will definitely run at least once

} while ( number < 0.5 );
```

## The for in loop

The for in loop is the least commonly used of the loops. It works on objects and their properties. You may remember from the objects lesson that an object can have properties. These are key/value pairs. The key is what we use to ask an object for a value.

```javascript

var myobject = new Object();

// myobject.key = value
myobject.a = "1";
myobject.b = "2";
myobject.c = "3";

```

The for in loop gives you each of the ***keys*** in term for an object that we give it. It looks like this.

```javascript
for(var key in myobject) {

	console.log(key); // a , b , c
	console.log(myobject[key]) // "1" , "2" , "3"

}
```

Try this one out for yourself in the console. Notice we use the array style notation to get the value out of the object. This is perfectly acceptable and is another way of getting the property value from an object.

## Summary

You just:

* Learned how to use a for loop to work on every element in an array
* Learned how and when to use a while loop
* Saw that the do while loop runs at least once
* Used the rarer for in loop to get all the property keys from an object







 

















