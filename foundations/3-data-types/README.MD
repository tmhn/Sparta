# Getting Started

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables

## This lesson covers

* Operators, properties and methods
* Strings
* Numbers
* Arrays
* Booleans
* Objects
* Type Coercion

***

In the previous lesson we put a number in to a variable to keep track of it. But numbers aren't the only things we can use. Javascript understands different ***types*** of ***thing*** that we can use. These are data types. 

Each data type has advantages and disadvantages depending on what you are trying to do with it. This is why it's important to have a good think about which data type is the best one to use to represent something.


## Operators, properties and methods

Each data type comes with extra information and actions that can be performed on them. These are largely what will determine which one you choose to represent something. Examples are addition, subtraction, length, and many, many more.

> NOTE : Methods are another name for functions and properties are just variables. They get these new names when they're inside objects. We'll discuss this more in a later lesson.

While we are going through each data type have a think about which type you would use to represent the following and why:

* A name
* A bank balance
* A list of names
* Whether a shop is open or closed

## Strings 

Strings represent basic text. They are great for storing paragraphs, single characters etc. You can create one like this:

```javascript
var myvariable = 'hello';
``` 

or with double quotes 

```javascript
var myvariable = "hello";
```

The single and double quotes make no difference in javascript. Just make sure you finish with the one that you started. 

Having two types allows use to use one inside the other as actual text

```javascript
var sentence = "Don't do that. You'll break it"
```

The single quotes inside the string are treated as text in this case. You can also do this the other way around.

### Operators, properties and methods

Open your terminal and try out the following:

```javascript
var myString = "hello";

// Operators
// concatenation ( adding string together )
console.log(myString + " Everyone");

// Properties
// how many characters does the string have
console.log(myString.length);

// methods
// find characters in a string ( which position is the "e" at )
console.log(myString.indexOf("e"));

// chop a chunk out of a string 
console.log(myString.substr(2,4));
```

> NOTE : There may be something confusing you above. How is the position of the "e" in the string 1? It's clearly the second character. That is because most modern languages are what's known as "0 indexed". This means that the first position is always considered to be 0 and not 1. This will come up in arrays later as well so remember it! It is a common source of errors.

There are many, many more methods you can use on string. You can find them easily enough on google.


#### Numbers

Numbers are, perhaps unsurprisingly, great for working mathematically. They come  all the operators you would expect for building mathematical equations and a few methods too.

We create numbers by not using quotes this time. Numbers can be integers, decimals ( known as floats ) and even exponential numbers.

```javascript
var myNumber = 5;
var myDecimal = 5.5;
var myExponential = 123e5;
```

### Operators, properties and methods

Open your terminal and try out the following:

```javascript
var myNumber = 5;

// Operators
// addition
console.log(myNumber + 3);

// subtraction
console.log(myNumber - 2);

// multiplication
console.log(myNumber * 4);

// division
console.log(myNumber / 5);

// increment ( increase by one )
myNumber++;
console.log(myNumber); // 6

// methods
// is it a finite number
console.log(myNumber.isFinite());

```

Again, this list is not exhaustive. Check out google for the rest of the operators and methods.

#### Booleans 

Used for controlling the flow of your programme and handling logic. We'll look at these more in a later lesson.

```javascript
var myvariable = true;
var myvariable = false;
```

Booleans don't have much in the way of properties or methods in the way that the other data types do. This is because they have a whole part of the language devoted to them which we'll explore in a later lesson.

#### Arrays

We will be using arrays a lot. They are pretty fundamental. They are essentially an ordererd list of ***any other datatype***, including other arrays! You can even mix and match the datatypes you use in one array. Here's how to create one using brackets:

```javascript
var myArray = [5,6,7,"a","b"]
```

This array has five items. Three Numbers and two Strings.

Once we've created an array we can easily ask for any item back by doing the following:

```javascript
// get the first value from the array
console.log(myArray[0]);
```

> REMINDER AND EXERCISE ( 5 Mins ): Don't forget about "0 indexing". How would I get the 3rd element from this array?

Arrays have many amazing methods and properties that help us to work with them. Here are a few of the more common examples to copy in to your console:

```javascript

var myArray = [5,6,7,"a","b"];

// properties
// how many items in the array
console.log(myArray.length);

// operators
// set a value in a specific position
myArray[2] = 8;
console.log(myArray);

// join two arrays
console.log(myArray + ["more" , "stuff"]);

// methods
// add another value to the end
myArray.push("I'm at the end");
console.log(myArray);

// remove and return the last element from an array
console.log(myArray.pop());
console.log(myArray);

// reverse an array
myArray.reverse();
console.log(myArray);
```

#### Objects

We'll have a proper lesson on objects. As a brief intro to objects they are another type of collection like arrays. But they contain properties and methods! 

This is why a string can have a length property and an array can have a reverse method.


## Type Coercion

What do you think would happen in the following situation?

```javascript
var myString = "5";
var myNumber = 3;

console.log(myString + myNumber);
```

What did you see in the console?

> DISCUSSION (5 Mins) : What did javascript do to make this work?

It may not be obvious but what javascript did to make sense of adding a number to a string was to convert the number in to a string and then add them together. Javascript is very helpful like this. 

This is known as type coercion or casting. Javascript has some built in guesses that it will perform. In this case numbers are always cast to strings.

What if you wanted it to do the opposite? There are some built in functions that we can use to convert from one data type to another.

Here are some examples:

```javascript
var myString = "5";
var myDecimalString = "2.5";
var myNumber = 3;

// change string to integer
console.log( parseInt(myString) + myNumber ); // 8

// change string to decimal ( float )
console.log( parseFloat(myDecimalString) + myNumber ); // 5.5

// change decimal to integer ( remove the point )
console.log( parseInt(myDecimalString) + myNumber ); 5
```

Notice that there is a difference between an interger and a float even though they are both numbers. This can cause problems sometimes if you use parseInt instead of parseFloat and you want a decimal answer. So be careful.




## Summary

You just:

* Learned the different types of variable we can create
* Saw that they can have other properties
* Saw that they can have methods
* Saw that there are operators that can act on variables and they work differently depending on the data type
* Saw how to convert from one type to another ( where it makes )


