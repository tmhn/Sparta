# Getting Started

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables

## This lesson covers

* What is a function
* Writing basic functions ( in two different ways )
* Calling functions
* Parameters
* Returns
* Evaluating

***

## Functions

### What is a function

Most programming languages use functions. Put simply they are used to create lists of actions that we might want to repeat. They also help us to organise our code so that we can keep it DRY! (Don't Repeat Yourself). Let's look at an example of a very basic function.

If I want to add two numbers together I can do the following
```javascript
var result = 5 + 10;
```

But what if I find myself repeating this code a lot? 

```javascript
var result1 = 5 + 10;
var result2 = 10 + 20;
var result3 = 3 + 10;
```

We could use functions to write something a bit more reusable. Let's look at how they're written.

### Writing basic functions

There are two ways to write functions. We will discuss when one is better to use than the other but for the moment you can use whichever you prefer.

###### Named functions - type 1
```javascript
function addNumbers() {
	var result = 5 + 10;
	console.log(result);
}
```
Let's look at the anatomy ( known as the signature ) of this function.

* function is a keyword that tells javascript that we're creating a function
* addNumbers is the name of the function. This can be ANYTHING you like. But choose something that is easy to understand and relevant to the function!
* the () known as parentheses are a container for parameters which we'll look at later. They are required
* the {} are known as a 'block'. This is what goes round the list of commands we want to run
* The rest is up to us! We write our list of things we want our function to do.

###### anonymous functions - type 2

We looked at variables in a previous lesson. Variables can store numbers, arrays, strings and objects. But they can also store functions that have no name! These are called anonymous functions. This is great because then we can pass functions around the same way we use variables. Here is the same function stored in a variable

```javascript
var addNumbers = function() {
	var result = 5 + 10;
}
```
As far as javascript is concerned these are both exactly the same. They are used the same way. They are simply different ways of writing the same thing.


> NOTE: camelCase is one way of writing words in script that makes them look neater if your variable or function name has more than one word. Make the first letter lowercase then capitalise the start of every other word. **camelCaseIsCoolAndMakesThingsEasierToRead**

### Calling functions

So far we've only ***written*** our function. It's sitting there waiting to be used. But it hasn't been used yet! To use a function we "call" it or "run" (either terminolgy is fine). Here's how to call the function we just wrote. 

```javascript
addNumbers();
```

Adding the parentheses to the name tells javascript to call our function and do all the actions we wrote inside it. This works exactly the same for anonymous and named functions too!

> EXERCISE: 10 Minutes - try writing a few functions and calling them.
> Use console.log() as a good way to show what each function is doing.
> For example 

```javascript 
function sayHello() {
	console.log('Hello world!');
} 
```

**Question: How useful is the addNumbers function we have written? How could it be improved?**
***

### Parameters

Hopefully your answers to the question above is "Not very useful". Unless we want to add the same two numbers every time it's pretty useless in fact. So how can we make it more generic? We can use parameters. Parameters are basically variables that belong to a function. When we call the function we can choose what goes in to the parameters and therefore change what the function does. Here's the addNumbers function made more useful.

```javascript
function addNumbers(number1 , number2) {

	var result = number1 + number2;
	console.log(result);

}
```
> NOTE: just like function names you can pick ANYTHING you like for your parameter names. But pick something that makes sense and would be easy to understand if you didn't know what the code did.

addNumbers now has two variables available to use in the list of instructions: number1 and number2. So how do we decide what goes in them? We choose those values when we ***call*** the function like this:

```javascript
addNumbers(1,5);
```

The 1 will be put in to number1 and the 5 will be put in to number2. Our function is now nice and generic. and we can call it as many times as we like giving it different numbers each time.

```javascript
addNumbers(1,5);
addNumbers(3,7);
addNumbers(10,30);
```

### Returns

At the moment our function is slightly more reusable. But what if I actually want to DO something with var result. Well, var result only exists inside our function and unfortunately it disappears as soon as the function is finished running. So once again our function is pretty useless. We need a way to get var result OUT of the function. For that we can use the **return** keyword.

```javascript
function addNumbers(number1 , number2) {

	var result = number1 + number2;
	return result;

}
```

Or written more neatly and simply

```javascript
function addNumbers(number1 , number2) {

	return number1 + number2;

}
```

Now when we call the function we can use the result that comes back.

```javascript
var answer1 = addNumbers(1 , 3)
console.log(answer1); // 4

```
### Evaluating

The above example should hopefully be pretty clear as to what is happening but there is a very simple way to think about whats actually happening that will help you in the future. Evaluating is what javascript does for us when we run code. It is the process of working things out and then swapping them for the answer. Let's use the above as an example.

```javascript
var answer1 = addNumbers(1 , 3)
console.log(answer1); // 4

```

If we were to break this down in to the the steps that javascript actually goes through it would look something like this:

```javascript

// step 1
var answer1 = addNumbers(1 , 3);

// step 2 - find the result ( what is returned ) of addNumbers(1,3) and swap it in.
var answer1 = 4;

// step 3 - swap answer1 for it's actual value
console.log(answer1);

// step 4 - log the value to the screen
console.log(4);

```

This idea of swapping may seem simple but it will really help when we look at "nested function calls" like this. 

> EXERCISE: 10 Minutes - In pairs try and figure out what answer1 would equal in the following code.
> HINT: You must always start from the inner most brackets first and work out. Just like in maths.
> Write out all the steps that javascript would go through.

```javascript
var answer1 = addNumbers( addNumbers(5,7) , addNumbers( addNumbers(2,10) , 2) );
```


## Summary

You just:

* Learned how to write named functions
* Learned how to write anonymous functions
* Learned that they both work the same way
* Learned how to use parameters to make a function more generic
* Learned how to return a value from your function
* Learned how to evaluate functions and what is really going on behind the scenes
* Learned how to write in camelCase to make things neater and easier to read




 

















