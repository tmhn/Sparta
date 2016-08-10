# Modelling and Object Oriented Programming

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Objects

## This lesson covers

* What is modelling
* Simplifying the terminology
* Encapsulation, Reusability and Extensibility
* Best practises - SOLID
* Searching for nouns and verbs

Modelling is the process of representing some part of your application with code. It's actually pretty simple to do but the most important thing to understand is ***why*** we do it. 

It can be very tempting to think that if your code works then why would you change how you've written it? This is a good approach when you're trying to get something working for the first time. But the biggest thing that new developers will learn is that you spend the vast majority of your time working on existing code. Not writing new code from scratch. 

If it's poorly written or difficult to understand or, most importantly, to reuse, it's going to take you an **awful** lot longer to make changes or updates.

The following principles will really help you to build nicely structured clean code. And that's when you will start to build ***really*** fast.

***

## Best practises

### Reusability, Extensibility and Encapsulation

These are things that should apply to the objects that you create. They are much easier to understand when you can see the benefit of them so we'll give an example of each in code.

#### Reusability

Your objects should be reusable. Which means that if you want to copy and paste the code for them in to another project you shouldn't have to change them too much. The easiest way to achieve this is to make your objects solve small single problems.

Here's an example of code that's not very reusable

```javascript
var UserAccount = function() {

	this.name = "";
	this.email = "";
	this.balance = 0;
	this.account_no = "";
	
	this.addPlayer = function(name) {
	
		this.players.push(name);
	
	}
	
	this.addScore = function(score) {
	
		this.scores.push(score);
	
	}

}

```

Why is this bad? 
 
## Summary

You just:

*  blah








 

















