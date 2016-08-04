# Objects

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Functions
* Data Types

## This lesson covers

* Creating Objects
* New
* Constructor Functions
* JSON


***

So far we've used different variables to represent things. We had a todo list which was an array of strings, numbers to represent how many todos we had and a few others. Now we've got one more, Objects.

Objects are a great way of organising your code and making it extremely reusable. And they're also surprisingly easy to use.

Objects are very simple. They can contain variables and functions at the same time. Although, they get new names when they're in an object. They're now called properties and methods. But they're still the same thing.

They are absolutely amazing for representing things because the properties ( variables ) tell us what the thing ***has*** and the methods tell us what the thing can ***do***.

Once we've defined the "blueprint" for an object we can then make as many of them as we need. 

> NOTE : Blueprint is an easy word to understand so I have used it throughout this lesson. But it is not a coding term. The correct terms are class, constructor or prototype depending on the language.

We'll need some examples of this to really make sense of it. First let's look at how to create them.

## Creating Objects

There are four ways to create objects. Each has it's benefits. Keep in mind that we'll be creating blueprints ( called classes or constructors in most languages ) and then making copies from that blueprint ( called instances ).

To help make sense of it, we're going to create an object that represents a person each time. But we can represent almost anything.

### new Object

Javascript has a built in blueprint called Object. We can use the "new" keyword to say that we want a new copy of that object type. A copy is called an "instance". 

Once we've created an instance from it we can add the properties ( variables ) and methods ( functions ) to it that we want.

```javascript
// make an instance from the Object type
var person = new Object();

// add some properties
person.name = "Steve";
person.age = 32;
person.employed = true;
person.friends = ["Matt" , "Lexie"];

// add a method
person.sayHello = function() {

	console.log('say hello');

}

// show us the object
console.log(person);

```

As you can see an object can contain any other data type as a property. String, numbers, booleans; even other objects! Copy the example above in to the javascript console and look at what is logged. 

We use the dot to put things in to the object and also to get things out. So to access those properties and methods would look like this:

```javascript

console.log(person.name); // steve
console.log(person.age); // 32

// call the method
person.sayHello();

``` 

These methods are fine but because we start with a blank blueprint ( Object ) and then add properties and methods after we've made a copy of it it's not very reusable. If we're going to make the same thing each time it would be better to change the blueprint before making the copies.

***

As an aside you can also use the following to do the same thing.

```javascript
// this is the same as new Object();
var person = Object.create();

person.name = "Steve";

```


Object.create has other options that are a bit beyond this lesson. For now it is just good to know it exists.


## Function constructor

One of the best things about creating a blueprint for an object is that we get to make as many instances of it as we need and they will all be the same. 

When we make a new instance a special function is run called a constructor function. This function is where we can do any custom set up for the object that we want. 

They are really easy to create in javascript as they are just normal functions. We give them a capital letter to show that we'll be using it as an object constructor. 

The following example creates the same type of object that we had before but instead of adding the properties to the instance we add them to the blueprint. Now every instance will have the same properties and methods.

```javascript
var Person = function() {
	
	this.name = "no name";
	this.age = 0;
	this.employed = false;
	this.friends = [];
	this.sayHello = function() {
		
		console.log('hi my name is ' + this.name);
	
	}

}

// make some instances from the blueprint
var person1 = new Person();
var person2 = new Person();

console.log(person1.name); // no name
console.log(person2.name); // no name

```

#### Arguments

As you can see, when we add default values to our constructor function all the instances get the same values. But ultimately we don't want all the instances to be the same. So we can use the constructor function to set each instance's properties as they get created.

All we have to do is give the function some arguments and then we can give the individual instances different values.

```javascript
var Person = function(name , age, employed) {
	
	this.name = name; // set the name you passed in
	this.age = age; // set the age you passed in 
	this.employed = employed; // set the employed status you passed in
	this.friends = [];
	this.sayHello = function() {
		
		console.log('hi my name is ' + this.name);
	
	}

}

// make some instances from the blueprint
var person1 = new Person("Steve" , 32 , true);
var person2 = new Person("Bob" , 25 , false);

console.log(person1.name); // Steve
console.log(person2.name); // Bob

```

#### this

You may have noticed that we've introduced another keyword, "this". This works inside an instance's methods to refer to itself. That way we don't need to know what the instance has been called.

It allows us to access the properties that are on that particular instance. This is extremely useful because it means an object can deal with it's own situation without worrying about the outside world. That is very important. 

> EXERCISE ( 25 Minutes ) : Try to model a bank account using objects. It should have a balance property, an account name property and a blocked ( can the account be used  ) property. Add two methods as well. One to make a withdrawl and one to display the balance. Have a think about which data types will best suit the various properties.


### JSON

JSON Stands for JavaScript Object Notation. It is a very quick way to create a single object. JSON has become one of the most popular ways of sending data over the internet because it's simple and easy to read. So it's a very important one to learn. 

It directly creates an instance without using a blueprint but we can add properties and methods right from the outset. Once it's created it's just like any other object instance.

Let's create our person instance again.

```javascript
var person1 = {

	name: "Steve",
	age: 32,
	employed: true,
	sayHello : function() {
		
		console.log('hi my name is ' + this.name);
	
	}

}

person1.sayHello(); // hi my name is Steve
```

The syntax is very different from before but you can still see the name of properties on the left of the colon and the value for each on the right. These are known as key-value pairs. 

Keep an eye out for the commas after each item. This is the most common source of mistakes.

JSON is so popular because it's very easy to create complex data structures with it. For this reason you'll often see it used for configuration or sending data.

Below is a complex example which has objects inside arrays inside objects. Copy the code in to your console and explore how the data structure works.

```javascript

var data = {
	class_name: "Sparta Class",
	teacher: {
		name: "Steve",
		age: 32,
		employed: true
	},
	lessons: [
		{
			name: "Lesson 1",
			info: "This is the first lesson."
		},
		{
			name: "Lesson 2",
			info: "This is the second lesson."
		},
		{
			name: "Lesson 3",
			info: "This is the third lesson."
		},
		{
			name: "Lesson 4",
			info: "This is the fourth lesson."
		},
		{
			name: "Lesson 5",
			info: "This is the fifth lesson."
		}
	]
}

console.log(data);

```

> QUESTION (5 Mins) : How would you access the 3rd lesson info from this object. Try it out in the console.




 
## Summary

You just:

*  Learned how to create a blank object with new and Object.create
*  Learned how to create a constructor function to use as a blueprint for other objects
*  Learned about "this"
*  Learned how to write and read JSON








 

















