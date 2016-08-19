# Node Intro

## Timings

This lesson should take between 45 and 60 minutes to complete.

## Pre-requisites

* Javascript foundations
* Node installed

## This lesson covers

* What is node
* The node console
* Your first node app

This module introduces you to server side/backend development. So far all the code we've written has run in the user's browser. It's been great for making changes to a page and for communicating with servers. But that is only half the story. We are now going to write code that determins what the browser get's sent in the first place! 

We will use code to ***change*** the HTML ***before*** it is sent to the user's browser. We will be accessing databases too so we can make things that persist for longer than the browser is open. And we will be using it to build our ***own*** APIs.

I said right at the start of the course that javascript was written to run in the browser. Well, because of this it became a very popular language. But unforunately it couldn't be used to write server side code. So developers had to learn another language aswell to do this.

That's where node comes in. Node is not a new language. it's a ***wrapper*** that allows us to run javascript code in other places than just the browser. Including on a server. This means you can write javascript for both frontend and backend.

Node also adds in some extra bits that make certain things much easier. For example including new scripts and files is really easy with node. 

But it's still javascript. With all the same rules and syntax that you learned before.

## The Node Console

Node has a command line console just like the one in the browser. It's a great place for testing.

Open the terminal and type ``node``

You should see a new prompt:

```
>
```

This is a pure node/javascript console. Try typing in some basic javascript to try it out:

```javascript
> 5 + 5
10
> 5 * 10
50
```

Press Ctrl + c twice to exit the console.

The node command is also how we run javascript files. Let's write our first one and run it.

## Your first node app

Open the starter code and type the following

```javascript
node app.js
```

This command will run all the javascript contained in the app.js file and then stop. This is how we will run node servers, scripts and installers. 

You should see the message printed to the screen. If you open the code you'll see that i've used console.log just like we can in the browser. This will get printed to your terminal now instead.

### Using other people's code

On the frontend we got quite used to pulling in other people's code to make our scripts more powerful. We used jQuery, for example, to manipulate the DOM. We really wouldn't want to write that ourselves every time. 

Node is no different. We will actually spend most of our time combining other people's code to make new things.

In the frontend we had bower to install ***dependencies***. It had a manifest file and a command line script to install everything. Well node has exactly the same thing in the form of NPM. The Node Package Manager. And it works in an almost identical way.

### Creating a manifest

A manifest file is simply a list of all the packages we need for our project. NPM will use this file to download everything we need and place it in the ``node_modules`` folder. We never save other people's code in to our Git repository as it makes it difficult to keep track of their updates. So node_modules is ignored by default in Git. But we do save our manifest file.

To create our manifest, which will hold our list of dependencies, is exactly the same as bower. In the starter code directory type the following:

```bash
npm init
```

Hit enter to take the default option each time. You should now have a package.json file in your directory. This is the same type of thing as the bower.json file we saw before.

If you open it you will see that it is in json format and has a dependencies section. This is where the list of package names will go.

Luckily we don't write much of this file manually. We let NPM handle it.


### Using a package

I think we should use a package someone else has written to make our script speak our message rather than printing it to the console.

Some quick searching for npm packages tells me that there is package that will do this very thing called Say.

[Say](https://www.npmjs.com/package/say)

> EXERCISE ( 10 Minutes ) : Open the manual for say. Follow the instructions and try to install it. Then alter our code to use the script. Turn your speakers on!

Let's look at this together.

### NPM Install

```bash
npm install say
```

We are installing the ``say`` package. If you look in your directory you will see there is a directory called node_modules. NPM will place the code for say in here.

Open up the package.json. What do you notice about the dependencies? The Say dependency hasn't been saved! 

``npm install`` will install the files but won't save it to the package.json.

To do that we need to add the ``--save`` flag.

Type the following in to the terminal:

```bash
npm install say --save
```

You should now see the Say package in your package.json dependencies.

### require


```javascript
var say = require('say');
```

In the frontend to use an external script we use the ``<script>`` tag. In node we use require. 

Require will look for a package called Say in the node_modules directory but it can also be used to load your own files.

This line says 'load the say package and put what it returns in the say variable.'

This line is important. A package can return absolutely ***anything***. It could be an object, a number, a function; anything. 

It is important to read the docs for each package to see how you should then use what you get back.

In the case of the Say package it returns an object that has methods on it we can use.

### Say

```javascript
say.speak("Hi, This is about as basic as node script can be. Hope you enjoy it. Right i'm off");
```

We can now use the say object to speak our message. Again it is important to note that this is someone else's code! What it does and how to use it is up to them. Make sure you read the docs!

Now we can run our script as normal with:

```bash
node app.js
```

And with a bit of luck it will speak to us.


## The differences

Because node doesn't run in a browser it doesn't have access to a DOM. So that's gone. Hence things such as jQuery are no longer of any use to us.

Node also has access to your hardware in a way that pure javascript doesn't. So we can make it read files, open server ports and many many other things.

But that being said. It's still javascript. Just javascript with quite a few extras.



 
## Summary

You just:

* Learned what node is and when it is used
* Learned how to use the node console
* Saw how to start a node project using npm init
* Saw how to install packages
* Learned how to require files in a node app
* Learned how to run a node app











 

















