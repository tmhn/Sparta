# Getting Started

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables

## This lesson covers

* Intro to operators
* Intro to objects
* Strings
* Numbers
* Arrays
* Booleans
* Objects
* Special Types
* Type Coercion

***

In the previous lesson we put a number in to a variable to keep track of it. But numbers aren't the only things we can use. Javascript understands different ***types*** of ***thing*** that we can use. These are data types. 

## Strings 

Strings represent basic text. They are great for storing paragraphs, single characters etc. You can create one like this:

```javascript
var myvariable = 'hello';
``` 

or with double quotes 

```javascript
var myvariable = "hello";
```

The single and double quotes make no difference in javascript. Just make sure you finish with the one you started. 

Having two types allows use to use one inside the other as actual text

```javascript
var sentence = "Don't do that. You'll break it"
```

The single quotes inside the string are treated as text in this case. You can also do this the other way around.


#### Numbers

Just numbers. Without speech marks 

```javascript
var myvariable = 5;
```

#### Booleans 

Used for controlling the flow of your programme and handling logic

```javascript
var myvariable = true;
var myvariable = false;
```

#### Arrays

An ordered list or collection of any of the other data types. 

```javascript
var myarray = [5,6,7,"a","b"]
```

#### Objects

Another type of collection. ( covered later )

## Intro to operators

Variables would be pretty useless if we couldn't do things to them. We can use symbols called operators to act on variables. They do different things depending on the data type. Not all operators will work on every data type. The operators we have available are as follows:

```javascript
= ( assign ) 
+ ( add )
- ( subtract )
/ ( divide ) 
* ( multiply )
%  ( modulus )
```

#### Operators
##### Concatenation

Strings can be added together with the plus sign. This is called String Concatenation

```javascript
var joinedString = "Hello, " + "World";
console.log(joinedString) // Hello, World
```

##### Comparison

Strings can also be compared to see if they are the same


## Summary

You just:

* Learned how to write named functions
* Learned how to write anonymous functions
* Learned that they both work the same way
* Learned how to use parameters to make a function more generic
* Learned how to return a value from your function
* Learned how to evaluate functions and what is really going on behind the scenes
* Learned how to write in camelCase to make things neater and easier to read


