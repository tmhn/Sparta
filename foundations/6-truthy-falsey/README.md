# Truthy/Falsey

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

* Variables
* Control Flow and Booleans

## This lesson covers

* What is truthy/falsey
* How are different things treated
* How is it useful

***

## What is truthy/falsey

Many programming languages have a useful feature. They let us use other data types in place of booleans. Everything has a true or false value. We call this truthy/falsey. 

This is really useful for checking whether things exist or not. Anywhere we can use true or false we can use the truthy falsey value of another data type. Here are a few examples.

### Numbers

In javascript all NON zero numbers are considered truthy. So 0 is falsey EVERYHING else is truthy. Even negative numbers!

What do you think the following would do?

```javascript
var money_left = 5;

if ( money_left ) {
	console.log("great i've got some money left");
} else {
	console.log("I'm broke!!");
}
```
This is great for testing the length of arrays, successful mathematical operations and a bunch of other stuff.

Change the value of money_left to 0 and copy it all in to your console to see what happens.

### Strings

Any non empty string is considered to be truthy. An empty string is considered falsey.

var your_name = prompt("Type your name");

if( your_name ) {
	console.log('ok cool, you actually typed something');
} else {
	console.log('Try again you were supposed to type something');
}

As you can see this is useful for making sure someone typed something amongst other things.

If you can't remember whether something is truthy or falsey there is a quick trick. The double bang method. As we saw earlier the ! ( bang ) symbol flips the true(thy) or false(y) value of something. So two bangs flips it, then flips it back giving us it's true or false equivalent.


> WORK TOGETHER ( 10 Minutes ) : Try out the following in the console using the double bang trick. Are there any that surprise you?

```javascript

!!0

!!""

!!"hello"

!!2.5

!!-5

!![]

!!["hello"]

!!{}

!!true

!!null

!!undefined

```

### Truthy/falsey evaluations

Question! What will the following evaluate to? Try them out in the console

```javascript

true || false

"" || "hello"

5 || 0

0 || false

true && 0

0 && 5

5 && 10

```

What do you notice? 

The expressions don't evaluate to ***true*** or ***false***. They evaluate to the first ***truthy*** value or the last ***falsey*** value in the case of an OR.

AND is similar. They evaluate to the first falsey value or if everything is truthy they become the LAST truthy value. 

That may all seem complicated but it is extremely useful for setting default values.

```javascript
var name = prompt('What is your name') || "Captain no-name";

console.log(name);
```

Try it out. Can you explain why this works?

## Summary

You just:

* Saw that all variables can act as true or false through the magic of truthy/falsey
* Saw a cheeky trick to test for truthy/falsey
* Saw how to use truthy false evaluations with OR to set default values
