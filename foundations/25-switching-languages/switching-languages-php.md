# Switching languages - PHP building blocks

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

Have learned at least one other language. Preferably ruby and javascript.

## This lesson covers

* Why we should we learn to switch languages
* How to start learning something new
* Mini php installfest
* Learn PHP quickly by looking for the building blocks


***

## Why we should we learn to switch languages

The tech industry moves at a rate that is almost unmatched by any other industry. Things that you learn today may be obsolete in a few years or sometimes even a few months. This can include anything; frameworks, plugins, apis, social media platforms and even languages! So if we can learn to switch easily we are infinitely more employable and also we learn new approaches that increase our knowledge.

### How to start learning something new

Luckily for us many new technologies are based on how things have been done in the past with only a few minor changes. So most of the time it is just a matter of 'translating' from one technology to another. We do this by looking for the things that we expect to see and then finding how they are implemented in the new technology. Often, the tutorials written for new technologies will take this approach as well. 

By way of example, we are going to translate from javascript and Ruby to PHP.

### Learn PHP quickly by looking for the building blocks

Before we can use a new language we need to identify the 'building blocks' that we use to write code. As I mentioned before these are very similar across many languages. Let's look at an example of each building block in all three langauges. Hopefully you will see how similar they are. We'll only be looking at the basic differences. There are obviously many more. But by getting the building blocks we can start to build and understand the language.

The first thing to understand about PHP is that it was built specifically for building web pages. So building command line apps can seem a bit clunky in some places. But in other ways it excels. You must use the right tool for the right job. Let's start with the basics.

#### Variables

```javascript
// javascript
var someVar = 5;

```

```ruby
# ruby
some_var = 5
```

```php
// php
$someVar = 5;
```
As you can see javascript uses the var keyword, ruby doesn't need anything to declare a variable and php uses the dollar sign to create a variable. But in most other ways they are the same.

#### Operators

```javascript
// javascript
var sum = 5 + 5;
var difference = 10 - 5;
var product = 5 * 10;
var fraction = 10 / 5;
var newString = "Hello, " + "world";
```

```ruby
# ruby
sum = 5 + 5;
difference = 10 - 5;
product = 5 * 10;
fraction = 10 / 5;
newString = "Hello, " + "world"; 
```

```php
// php
$sum = 5 + 5;
$difference = 10 - 5;
$product = 5 * 10;
$fraction = 10 / 5;
$newString = "Hello, " . "world"; // . used for strings
$newNumber = 5 + 5 ; // + used for numbers
$changedString = 5 . 5; // becomes a string "55"

```
In php the majority of the basic operators are the same. One big difference is that we used a full stop to add strings and a plus to add numbers. If you mix them up php will change the values to numbers or strings depending on which you've used ( casting ).


#### functions

```javascript
// javascript
function introduceMe(name) {

	return "Hello, my name is " + name;

}

introduceMe("Steve");
```

```ruby
# ruby
def introduceMe(name)

	"Hello, my name is " + name

end

introduceMe("Steve");
```

```php
// php
function introduceMe($name) {

	return "Hello, my name is " . $name;

}

introduceMe("Steve");

```

Functions are almost exactly the same in php as they are in javascript. Like javascript, and unlike ruby, we need the return keyword or else nothing is returned. 

#### Loops

Loops are similar. PHP can be a bit simpler here than both javascript and ruby. Ruby has many more ways of doing loops however. Here are just a few.

##### For

```javascript
// javascript
for( var i = 0; i < 10; i++ ) {
	console.log(i);
}
```

```ruby
# ruby
for i in 0..10 
	puts i;
end
```

```php
// php
for( $i = 0; $i < 10; $i++ ) {
	echo $i;
}
```

##### Each

```javascript
// javascript ( only works as expected on objects, not arrays, unless you use jquery or similar so have used jquery )
var someArray = ["steve" , "bob" , "smith"];

$(someArray).each(function(index, element) {

	console.log(element); // "steve" , ...

});
```

```ruby
# ruby
some_array = ["steve" , "bob" , "smith"]

some_array.each do |element|

	puts element // "steve" , ....

end
```

```php
// php
$someArray = ["steve" , "bob" , "smith"];

for ( $element in $someArray ) {

	echo $element;

}
```

#### Built in methods and properties in data types

As a lover of PHP even I must admit that this area is probably why PHP can be unpopular with lovers of Ruby and Javascript.

PHP datatypes are not objects. They are known as primitives. They do not have built in parameters or methods so we must rely on global php functions to perform some actions and to get info about them. Here are some examples.

##### Length of an array

```javascript
// javascript
var someArray = [1,2,3,4,5];
console.log(someArray.length) // 5
```

```ruby
# ruby
some_array = [1,2,3,4,5];
puts some_array.length // 5
```

```php
// php
$someArray = [1,2,3,4,5];
echo count($someArray); // 5
```

##### Length of a string
```javascript
// javascript
var someString = "hello everyone";
console.log(someString.length) // 14
```

```ruby
# ruby
some_string = "hello everyone"
puts some_array.length // 14
```

```php
// php
$someString = "hello everyone";
echo strlen($someString); // 14
```

Every language has it's plus points. This is not one of PHPs. But PHP is one of the fastest moving languages out there. The community has already built versions of php that include ruby style objects. We just have to hope they're included soon.

#### Objects and classes

Javascript does not have true support for classes but it does handle objects reasonably well. Ruby is much better. PHP has excellent support for classes and objects.

```javascript
// javascript ( constructor function type )

var MyClass = function(name) {

	this.name = name;
	
	this.sayHello = function() {
	
		console.log("Hi, my name is " + this.name);
	
	}

}

var myObject = new MyClass("Steve");

myObject.sayHello();
```

```ruby
# ruby

class MyClass

	attr_accessor :name

	def initialize(name)
	
		@name = name;
	
 	end	
 	
 	def say_hello
 	
 		puts "Hi, my name is #{@name}"
 	
	end 	

end

my_object = MyClass.new("steve");

my_object.sayHello();
```

```php
// PHP

class MyClass {

	public $name;
	
	public function __construct($name) {
	
		$this->name = $name;
	
	}
	
	public function sayHello() {
	
		echo "Hi, my name is #{$this->name}";
	
	}

}

$myObject = new MyClass("steve");

$myObject->sayHello();


```



> EXERCISE 20 Minutes: Using what you've seen above as a cheatsheet try to build a simple higher or lower guessing game. A random number should be generated between 1 and 10 and the user should try to guess it in as few guesses as possible. The computer should respond with "higher","lower" or "correct" depending or the guess. If you need something in php that you haven't seen try using the same as javascript. You'll be surprised by how many things are the same.



## Summary

You just learned:

* many languages based on C are similar
* You can often guess and be right
* When learning a new language look for the basic building blocks first
* variables, functions, objects, loops in php.
