# Getting Started

## Timings

This lesson should take between 30 and 45 minutes to complete.

## Pre-requisites

None

## This lesson covers

* What is javascript ( helpful to powerful )
* Other names
* Syntax
* Variables


***

## Introduction to javascript

I'm sure you all know that javascript is a coding language but understanding where it came from and where it's going will help you to understand a few of it's quirks. 

### What is javascript

Javascript is a language written to run in a web browser. The idea was to allow developers to make the browsing experience more interactive. It was written in about ten days by Brendan Eich in 1995. So it's been around for a while. There is a strong belief that he was drunk when he wrote it (Seriously).

There are many coding and programming languages out there. Each one falls on a scale with "Helpful" at one end and "Powerful" at the end. Javascript lives firmly at the "Helpful" end of the scale.

It is a very forgiving language that can lack a bit of elegance. But for this reason it become very popular as a learning tool. 

Javascript is rapidly being improved and now with the advent of Node ( covered later ) it is moving a little closer to the powerful end of the spectrum. It is fast becoming a popular language for all sorts of applications.

It does still have it's quirks though. Mostly because it was officially built by commitee. Here's a fun video that will show you what to expect.

[video] (https://www.destroyallsoftware.com/talks/wat)

### Other names for javascript

You might see a lot of names for javascript. This is mostly because different companies chose to implement it in different ways. While they are all broadly the same it's good to know some of the names in case you see them in the wild. The official name for the language is ECMA Script. Currently ECMA 5 is the standard. ECMA 6 is coming soon and we will discuss it later in the course. The following are a few of the implentations for ECMA Script: 

* LiveScript
* JScript
* JavaScript

Mostly we'll be talking about Javascript. And if you were going to look something up that's what you should be looking for. But remember that it is an implementation of ECMA 5 and soon ECMA 6.

### Syntax

You will hear the word syntax used a lot when programming. Syntax is simply the rules of the language. We have similar rules in english. When we finish a sentence we use a full stop. Sentences start with a capital letter etc etc. We have these rules to avoid confusion and to make things make sense. 

Programming syntax exists for the same reason. It ensures that javascript ( which is a lot less understanding of a badly worded sentence ) understands what you're trying to say. This can take the form of keywords, brackets, colons and many other things that are needed.

If you can't remember the syntax for something it's perfectly fine to look it up. But don't be lazy with your syntax!

### Variables

Variables are used in pretty much every programming language. Variables are boxes in which we can store information. Here's a simple example:

```javascript
var a = 5;
```

> QUESTION : What do you think is happening here. Take a few minutes to discuss.

As we discussed in the previous section this is the syntax for creating a variable. Let's look at the parts:

* The 'var' keyword. This tells javascript that we are creating a variable.
* The name of the variable. Can be anything that's NOT a keyword. In this case 'a'
* The = sign. This tell javascript that we're making the left hand side equal to the right hand side. This is called assignment.
* The value to assign. In this case '5'
* The semi-colon. Tells javascript it's the end of a statement ( like ending a sentence in english )

The var keyword is only needed when we create a new variable. Now that 'a' exists we can use it as much as we like.

```javascript
a = 10; // change a to 10
console.log(a); // prints 10 to the console
``` 

'Var' actually has a special meaning that we will look in to more when we look at scope.


## Summary

You just learned:

* Some of the history of Javascript
* Javascript is known by many names. Javascript and ECMA Script are the ones to remember
* Why syntax is important
* How to create and assign variables
