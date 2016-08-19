# Modelling and Object Oriented Programming

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Objects

## This lesson covers

* What is modelling
* Simplifying the terminology
* Inheritence
* Encapsulation, Reusability and Extensibility
* Best practises - SOLID
* Searching for nouns and verbs

Modelling is the process of representing some part of your application with code. It's actually pretty simple to do and we have in fact been doing it all along. But the most important thing to understand is ***why*** we do it. 

It can be very tempting to think that if your code works then why would you change how you've written it? This is a good approach when you're trying to get something working for the first time. But the biggest thing that new developers will learn is that you spend the vast majority of your time re-working existing code. Not writing new code from scratch. 

If it's poorly written, complex or difficult to understand or, most importantly, to reuse, it's going to take you an **awful** lot longer to make changes or updates.

The following principles will really help you to build nicely structured clean code. And that's when you will start to build ***really*** fast and to make changes very easily.

***

## Best practises

### Reusability, Extensibility and Encapsulation

These are things that should apply to the objects that you create. They are much easier to understand when you can see the benefit of them so we'll give an example of each in code.

The biggest thing to look out for in each example is dependecies. You want to minimize the effect that making changes in one place will have on other projects or parts of your code. Otherwise you end up with a house of cards. Pull one card out and the whole thing falls down.

These three rules will help you to do just that.

#### Reusability

Your objects should be reusable. Which means that if you want to copy the code for them in to another project you shouldn't have to change them too much, if at all, to make them fit. The easiest way to achieve this is to make your objects solve small single problems rather than a bunch of different problems.

Here's an example of code that's not very reusable ( i.e really terrible ):

```javascript
var MathAndTranslationFunctions =  {

	english_words: [],
	french_words: [],

	add: function( a , b ) {
		
		return a + b;
	
	},
	
	subtract: function( a , b ) {
	
		return a - b;
	
	},
	
	englishToFrench : function(word) {
	
		var index = english_words.indexOf(word);
		
		return french_words[index];
	
	},
	
	frenchToEnglish : function(word) {
	
		var index = french_words.indexOf(word);
		
		return english_words[index];
	
	}

}

```

Why is this bad? Well, if I want to use my translation functions in another projects I have to take all the unwanted math functions along too. Or change my object. This is a lot of extra work. 

What's the harm in having unwanted code? Readability is an issue but also you don't want your code to be too big either. It will be loaded over the internet so speed is an issue. 

#### Extensibility

If your objects are extensible it basically means that we've made it as easy as possible to add things to them in the future or to adapt them in specific cases without breaking them for everyone else that is using them. 

In some languages this relies on features of the language such as being able to override functions and using inheritence. But it can also have an effect on the how you lay out your objects. Here's a very simple example of something that would be hard 
 
## Summary

You just:

*  blah








 

















