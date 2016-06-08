# Control Flow and Booleans

## Timings

This lesson should take between 60 and 90 minutes to complete.

## Pre-requisites

* Variables
* Data Types

## This lesson covers

* Making decisions with booleans
* if/else
* Comparisons and logical operators
* Truthy/Falsey
* Switch

***

We've seen that javascript runs our code in order. It evaluates each line in our code and then moves on to the next. This is called "linear" code. 

But if everything we wrote just ran from start to finish and then stopped it wouldn't be very useful. We might want to make decisions at certain points and then move the program in a different direction. 

This is where control flow comes in. 

## Making decisions with booleans

We saw in the data types lesson that booleans can have on of two values, true or false. Booleans are the data types that we use for making decisions. 

Luckily for us control flow reads very much like english when we get the code right. So let's start with a real world example and try and turn it in to real code.

> You don't know if you can afford to buy another drink. You decide that you will if you have more than 10 pounds in your pocket. If not you should really go home.

What could this decision look like written in plane english? 

"If the money in my pocket is greater than 10 then I'll buy another drink. Otherwise I'll go home."

Let's try and translate real life in to code. Open the starter code in sublime.

## If/Else

### If

In the above example we used the word if to show that we had a decision to make. Luckily for us most languages do aswell. It looks like this. 

```javascript
if ( thingToTest ) {
	// code to run if thingToTest is true
}
```
The curvey brackets () contain the test. If what we put in there evaluates ( simplifies down ) to be true then the code in the curly brackets {} will be run. Copy the following in to the flow.js file.

```javascript
var money_in_my_pocket = 20;

if (money_in_my_pocket > 10) {
	console.log("Another drink please!");
}
```

The `money_in_my_pocket` variable is the thing we want to test. In the above example we are using the `>` operator which asks:

"is the thing on the left greater than the thing on the right".

You can hopefully see how this would evaluate (simplify) to be true.

It might read something like:

"It is true that `money_in_my_pocket` is greater than 10"

Reload the page and look in the console. You should see that our friend is going to get another drink!

### Else

Have a look back at our decision we wrote in plain english. We have accounted for the word if. But is the other important word used?

We said:

***Otherwise I'll go home.***

This is what happens if our check was NOT true. In other words if it was false. Let's try to model this too. For this we us the "else" keyword.

Copy the following to the end of your flow.js file

```javascript
else {
	console.log("I'm off home");
}
```

The whole thing should like this

```javascript
var money_in_my_pocket = 20;

if (money_in_my_pocket > 10) {
  console.log("Another drink please!");
} else {
  console.log("I'm off home");
}
```

You may be thinking at this point that this will always have the person asking for another drink. Because `money_in_my_pocket` never changes. So let's change that.

Change your first line to the following:

```javascript
var money_in_my_pocket = prompt('How much money do you have?');
```

Reload your page and try typing in a number when prompted!

You should see now that things can change in the program and we now have a way to handle those changes!

### else if

In our current example we only perform one check. But what if our question was more like this:

> If I have more than 10 pounds in my pocket I'll buy another drink. If I have more than 5 pounds I'll buy some crisps. Otherwise I'll go home.

For this we can chain some checks together using `else if`. Here's how it works:

```javascript
if (money_in_my_pocket > 10) {
  console.log("Another drink please!");
} else if (money_in_my_pocket > 5) {
  console.log("Just crisps then");
} else {
  console.log("I'm off home... sigh");
}
```

Copy this new code in to your flow.js file over the top of the old code.

The whole thing should now look like this:

```javascript
var money_in_my_pocket = prompt('How much money do you have?');

if (money_in_my_pocket > 10) {
  console.log("Another drink please!");
} else if (money_in_my_pocket > 5) {
  console.log("Just crisps then");
} else {
  console.log("I'm off home... sigh");
}
```

You can chain as many else if's on as you like. You can also leave off the else at the end if you like.

## Comparisons and Logical Operators

### Comparisons

So far we have only used one operator to perform a check. We compared two numbers There are a few other operators we can use to compare things. Let's try them out.

> ALL TOGETHER ( 10 Minutes ) : Open the javascript console and try the following examples. See if you can guess which ones will be true and which will be false. Ask the students before showing the answer

```javascript

// greater than
10 > 5
=> true

// less than
1 < 3
=> true

1 > 5
=> false

// equals ( single = is used for assignment so we use double for a check ) 
1 == 1
=> true

// not equals
1 != 1
=> false

10 < 10
=> false

// less than or equals
10 <= 10
=> true

// greater than or equals
10 >= 10
=> true

// doesn't just work on numbers
"a" == "a"
=> true

"a" == "b"
=> false

// good god! alphabetical comparisons!
"a" < "b"
=> true

"z" > "c"
=> true


```

### Logical operators

We can combine true and false statements to create more complex conditions. In english we use the words AND and OR to do this.

#### AND

In javascript "AND" is written with two ampersands && . The && sign means:

"If the expression on the left is true AND the expression on the right is true, the the whole thing becomes true."

Open a console and try out the following examples:

```javascript
true && true
=> true

true && false
=> false

5 > 10 && 3 < 5
=> false

3 == 3 && 1 == 1
=> true
```

#### OR

OR is written with two "pipes" likes this ||. They can be thought of like this:

""If the expression on the left is true OR the expression on the right is true, the the whole thing becomes true."

Try out the following in the console

```javascript
true || true
=> true

true || false
=> true

false || true
=> true

false || false
=> false

10 > 3 || 3 == 3
=> true

1 == 2 || 1 == 1
=> true

1 != 1 || 2 > 3
=> false
```

> EXERCISE ( 20 Minutes ) : Update our example in the flow.js to include the following conditions :
> "If I have more than 10 pounds in my pocket AND I've had fewer than three drinks I'll buy another drink. If I have more than 5 pounds OR the crisps are free I'll buy some crisps. Otherwise I'll go home.
> HINT: You may need to create some new variables.


Here's one solution:

```javascript
var money_in_my_pocket = prompt('How much money do you have?');
var drinks_drunk = prompt('How many have you had already?');
var price_of_crisps = prompt('How much are those crisps?');

if (money_in_my_pocket > 10 && drinks_drunk < 3) {
  console.log("Another drink please!");
} else if (money_in_my_pocket > 5 || price_of_crisps == 0) {
  console.log("Just crisps then");
} else {
  console.log("I'm off home... sigh");
}
```


## Summary

You just:

* Learned how to use inline scripts ( and that you shouldn't ever )
* Learned how to put scripts in the head.
* Learned how to put scripts in the body to wait for the page to load first.
* Learned how to pull in external scripts. This is the best thing to do.
* Learned that scripts must load and run before they continue. So be careful with blocking.
* Learned that order is important when loading scripts!






 

















