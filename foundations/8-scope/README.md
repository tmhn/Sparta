# Scope

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Functions

## This lesson covers

* What is scope
* Lexical Scope
* Nested functions
* Global Scope
* Private ( Faking it )

***

As your applications get bigger you'll start to use more and more variables and functions. 

This means there's a good chance that we'll start to run out of variable names, get clashes and find it very difficult to understand what's happening. 

We need a way to separate things. This is what scope does. It determines what can be "seen" from where.

## Lexical Scope

Lexical Scope is one of a few ways of applying scope. It is used in many modern programming languages.

Lexical scope in a nutshell works like this:

"Code can see out but it can't see in"

To make sense of that let's look at an example. Type the following in to your javascript console.

```javascript

var outsideVariable = 5;

function doSomething() {
	console.log(outsideVariable);
}

doSomething();

```

We have two distinct areas here. The parts that are "outside" the function and the parts that are "inside" the function.

The console.log function is trying to look at something that was created ***outside*** the function. But it is doing this from ***inside*** the function.

> QUESTION ( 5 mins ) : Will this work?

You should have seen that the outsideVariable is visible ***inside*** the function. So this example works.

Let's look at one that proves that it does NOT work the other way around. Paste the following in to your console:

```javascript

function doSomething() {

	var insideVariable = 5;

}

doSomething();

console.log(insideVariable);

```

You should see this time that the insideVariable is not available to us from ***outside*** the function. We get an error.

```javascript
Uncaught ReferenceError: insideVariable is not defined
```

We can see ***out*** but we can't see ***in***.

This isn't only true of variables. It works with functions too.

```javascript
function firstFunction() {
	
	console.log('I am the first function!');

}

function secondFunction() {

	firstFunction();
	console.log('I am the second function');

}
```

Here the second function can ***see*** the first function because it was declared ( created ) outside.

## Nested functions

Something we haven't seen yet is that functions can be defined inside other functions. This is called nesting. It's useful for keeping functions separate in the same way that it is for variables. But it does add an extra factor to our scope disucssion. Consider the following:

```javascript

function joinStringsAndPrint( string1 , string2 ) {

	var newString =  string1 + string2;
	
	function printString( string ) {
	
		console.log(string);
	
	}
	
	printString( newString );
	
	return newString;
	

}

var string1 = "hello, ";
var string2 = "world";
joinStringsAndPrint( string1 , string2 );
 
```

Here you can see that the printString function is defined ***inside*** the joinStrings function. This is called nesting. printString is a nested function. For nested functions scope works the same way. It can see out but other things cannot see in. It can also see out to all the levels above it. That means that printString can see everything at the top level too.

> DISCUSSION: 5 ( Mins ) Which of the commented lines below do you think will work? Discuss then uncomment them to test them.

```javascript

function joinStringsAndPrint( string1 , string2 ) {

	var newString =  string1 + string2;
	
	function printString( string ) {
	
		console.log(string);
		
		// Q3
		// console.log(newString);
		
		// Q4
		// console.log(string1 + string2);
	
	}
	
	printString( newString );
	
	return newString;
	

}
var string1 = "hello, ";
var string2 = "world";
joinStringsAndPrint( string1 , string2 );

// Q1 
// printString( "run from outside joinStrings" );

// Q2
// console.log(newString)
 
```

You can have functions nested in functions nested in functions, to as many levels as you like. But there is rarely a good reason to have more than one level like in the example above.

## Global Scope

Anything that we create outside of any functions at the top level of our file is said to be in the global scope. This means that it is availble everywhere as we saw in the nested example. In other words it's globally available.

Global variables are extremely useful but also ***extremely*** bad practise. The reasons for this iare simple. 

1. If your global variable can be seen from anywhere it can be changed from anywhere. 
2. As your app gets to be more complex this gets harder to keep track of
3. It makes are functions and objects much less reusable as we have introduced what is a called a "dependency". It relies on something that is provided elsewhere

Nonetheless in your first attempts at building apps it is ok to use globals until you see some of the ways we can avoid them.

You can also define a global from inside any function by omitting the ***var*** keyword when creating a variable. But this is seriously bad practise as well. It's good to know however so that you don't do it accidently. Try the following.

```javascript

	function createGlobals() {
		
		a = 5;
	
	}
	
	createGlobals();
	
	console.log(a);

```

## Summary

You just:

* Learned how to use a for loop to work on every element in an array
* Learned how and when to use a while loop
* Saw that the do while loop runs at least once
* Used the rarer for in loop to get all the property keys from an object







 

















