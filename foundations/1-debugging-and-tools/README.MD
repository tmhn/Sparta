# Getting Started

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

Variables

## This lesson covers

* The console
* Finding and fixing errors
* Debugger and breakpoints
* Elements and the inspector

***

## Debugging and Chrome Dev Tools

Your code will spend the majority of it's time broken. This has nothing to do with being a good or a bad developer. It is the nature of development and cannot be avoided. The best we can do is to help ourselves find these errors more quickly and to understand what's gone wrong. This is debugging.

> IMPORTANT: Learn to love debugging! You'll be doing a lot of it. When you get a bug, grab a cup of tea and settle in like your doing a crossword.

### The console

Most web browsers like Chrome, Firefox and Safari allow us to see the inner workings of a web page. This includes the javascript,html and css running on that page. We can use the console to interact in real time with our scripts, test things out and also see any errors. This means it's great for debugging!

You can open the console in chrome in a few different ways.

```javascript
Cmd + Alt + j
```

```javascript
Right Click > Inspect > Console Tab
```

What we have here is a pure javascript console. We can type javascript commands in here and have them effect the page. Try the following:

```javascript
5 + 5;
10
```

Notice that the answer ends up on the second line. What's actually happening here is that the RETURN from the previous line ends up on the next line. Let's look at some useful commands.

#### console.log

Try this:

```javascript
console.log('hello');
hello
undefined
```
The console.log command allows us to print something to the console. Notice that hello was printed on the next line. You can use this anywhere in your code so it's also great for debugging.

> QUICK DISCUSSION : Why did we get undefined after called console.log

#### alert

Alert is a pretty old way of getting the users attention. It really shouldn't be used any more in modern websites. But it still is. It can be good for debugging because it stops the code from running until the alert is cleared. Plus it's pretty funny. Try this:

```javascript
alert('bang!');
undefined
```

Notice we're still getting undefined. Alert doesn't return anything. It just make a lot of noise.

Now try this:

```javascript
alert('wait a sec');
5 + 5;
```

What did you notice? The 10 doesn't appear until you click the ok button on the alert. So it has blocked ( paused ) the execution of the script.

#### prompt

Another pretty bad and old school way of getting an input from a user. But it works fine for quickly testing out ideas. Try this

```javascript
prompt('Please type a number');
```

You should see that what get's returned is what you type in to the prompt box.

### Finding and fixing errors

The console also makes it very easy for us to find the location of errors in our code. Open the index.html in the starter code and open the terminal.

You should see an error marked in red. The console gives us a lot of information about what has gone wrong. What does the first error say?

> DISCUSSION : Take a few minutes to discuss all the information that you get from a single error in the console


On the left of the error console you will see the type of error that has occurred while on the right you will see the name of the file the error is in and even the line number in that file!

The error says the the method is undefined. There is something very important to remember here. Error messages can sometimes lead us in the wrong direction. Sometimes we have to investigate a little further.

The first error message reads

```
Uncaught ReferenceError: consoole is not defined   index.js:2 
```

The javascript console is telling us that consoole does not exist. Does this mean that we forgot to create a consoole function or variable? Or is it more likely that the spelling is wrong?

In this case it should be console. So let's fix it.

Change line 2 to the following

```javascript
console.log('Error1 Fixed');
```

Reload the page and look at your console again. You should see that another error has appeared! This is important. Your script in one file will stop running when it encounters an error. This means that subsequent errors will be hidden! It may also mean that what you thought you fixed actually broke something else! So be careful.

> EXERCISE : Take 5 Minutes and fix all the bugs.

### Debugger and breakpoints

We've already seen how the alert() function will pause ( block ) the execution of our script. As our scripts get bigger it would be useful to be able to pause the script at certain points to check on our script. Rather than the use the alert function ( which is bad ) we can use breakpoints. 

These are points in the script that we've told javascript to stop at until we're ready to move on. This can be extremely valuable. Especially when there are a lot of things going on.

There are two ways to set breakpoints.

#### The debugger keyword

Open up the index.js in the starter code and find the space on line 6. Make the code look like the following.

```javascript
5 someVariable++;
6 debugger;
7 someVariable++;
8 someVariable++;
```

Now reload your page. You should see the sources tab open up and the debugger keyword highlighted. The script is currently paused at this point. If you click back to the console tab you will see that our variable hasn't yet been logged to the screen.

While the script is paused we can inspect our variables. Try this:

```javascript
console.log(someVariable);
```

You can view and change the value of any variable at this point in the code. This is really useful for comparing the actual value of things to what you expect them to be.

To continue running through the script you can either hit the play button on the right of the sources tab or hit f8. The script will continue to the next breakpoint.

> NOTE : Always remember to remove your debugger points after you've finished. They should never be left in your production code.

#### Breakpoints

You can achieve the same thing by setting breakpoints in the sources tab. You can open any file attached to your page here and right click on the line number. You should see the option to add a breakpoint. The breakpoints you set will be highlighted in blue.

If you refresh the page the script will run to this point just as if we'd used the debugger keyword.

### Elements and the inspector

We can use the dev console to debug more than javascript. We can also debug our html and css. Open up the elements tag in the console.

Open www.google.co.uk in a new browser tab.

On the left at the top of the console you should see a pointer ( arrow ). Click it to turn on inspector mode. You can also press:

```
CMD + SHIFT + C
```


Now run your mouse over different parts of the page. Try running it over the Google logo. You should see that the relevant part of the html is highlighted in the elements tab.

You can also run your mouse over the html to see the relevant part of the page. It works both ways. Notice the small arrows in the html. You can click these to open up the element and see whats inside. It will only have an arrow if the element has other elements inside it.

If you click on an element either in the html or the page you'll see that the CSS on the right of the console changes. This is the CSS that has been applied to the element you clicked. The best part about this is that we can change it in real time!

This is a great way to test items on the page and test out new styles. 

> EXERCISE: Take a few minutes and try to change a few items on the page. Make the background a different colour and try to make the google logo bigg.

Once you have made your changes, refresh the page. What happens to your changes?

> QUESTION : Why did your changes disappear?

When you load a web page your browser effectively grabs it's own copy of the code to show you it. So when you make changes you do not change the original file. When you refresh your copy is overwritten. So this means we can play with Google without worrying about breaking a thing!


## Summary

You just learned:

* How to find errors in the console
* How to test your code in real time
* How to pause your scripts using the debugger keyword and break points
* How to use the elements inspector to make temporary changes and to view html and css
