# Intro to React

## Timings

This lesson should take between 30 and 50 minutes to complete.

## Pre-requisites

* Modules 1 & 2

## This lesson covers

* What is react
* Installation
* Webpack
* Babel
* Gotchas
* ES6


React is not so much a framework as it is a UI library. It is a collection of functions and object that will help you to create reusable UI components. So far we've built some fairly complex layouts using node and express. As the views of our apps got to be more complex we started to use partials and layouts to make things more modular and reusable. This is exactly what React does but it takes reusability to a completely new level.

In the starter code we have a ridiculously simple html and javascript app that simple uses javascript to render a header to the page. We're going to turn this in to a React app that does that same thing. In the process we'll see how to install React and get it running.


## Installation

React is a javascript library. It's the first library that we can use on the frontend or the backed. But for the moment we're going to run React in the frontend. Let's install it with bower:

```bash
bower init
bower install react --save
```

The react directory in bower_components contains a few files but for the moment we only need two of them. One for React and another for ReactDOM. Let's add them to the index.html:

```html
<script src="bower_components/react/react.js"></script>
<script src="bower_components/react/react-dom.js"></script>
```

Including these two files has given us access to two new objects; React and ReactDOM. React is used for creating elements and components and ReactDOM is used for rendering them to the DOM.

Our javascript file looks for an element called "container", creates an <h1> element then appends it to the container. Pretty basic.

The same thing in React looks like the following. Change the index.js to:

```javascript
var h1 = React.createElement('h1', null, 'Hi Team!');

ReactDOM.render(h1, document.getElementById('container'));
```

Refresh your page and you should see the element rendered to the screen. 

I know what you're thinking. This isn't quite as mind blowing as jQuery was the first time you saw it. It gets a lot more interesting. But for now we're keeping it simple.

## JSX

One of the great features we can use with React is JSX. JSX is a strange hybrid of javascript and HTML ( Well XML really. Hence the X ).  

It's going to help us keep our code clean by letting us write html in side our javascript functions.

Here's the same thing written in JSX:

```javascript
ReactDOM.render(
	<h1>Hi Team!</h1>, 
	document.getElementById('container')
);
```

That's quite a bit neater. Unfortunately JSX isn't supported in most browsers. So if we tried to include this "as is", it would most likey break. 

What we need is a translator. A program to take our JSX and turn it back in to nice clean es5 javascript. There are few out there that we can use but we're going to use a combination of webpack and babel.

Copy the code above in to your index.js file and rename it to index.jsx.

Let's look at what webpack and babel do.

## Webpack

Put simply, webpack is a package that can understand all the complex requirements of your app, crunch them and combine them all together and then spit packed js,css etc. It's minification and concatenation on steroids. It also supports plugins. 

We'll use webpack to pull all our required files together, spit out a single file and then we'll plug Babel in to it to handle our translation at the same time.

Let's get webpack working first:

```bash
npm install webpack -g
```

We'll also need a config file to tell webpack what we want it to do. This is actually a node module:

```bash
touch webpack.config.js
```

Open this file and enter the following:

```javascript
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var JS_DIR = path.resolve(__dirname, 'js');

var config = {
  entry: JS_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};

module.exports = config;
```

As always we require the webpack module that we need. We also require a package called file to help us with some folder paths. 

The config object tells webpack to look in the javascript directory ( JS_DIR ) for a file called index.jsx. That file will be "packed" and the result will end up in the build directory ( BUILD_DIR ) in a file called bundle.js.

Let's run it as is and see what happens. Run this command from the terminal:

```bash
webpack -d
```

> NOTE : -d is for development mode

```javascript

ERROR in ./js/index.jsx
Module parse failed: js/index.jsx Line 2: Unexpected token <
You may need an appropriate loader to handle this file type.
| ReactDOM.render(
|   <h1>Hi Team!</h1>, 
|   document.getElementById('container')
| );
```

Webpack tried to compile our code but as we said earlier it can't translate our JSX for us without a plugin. So it throws an error. 

We need to install babel.

## Babel

Babel has become the recommended JSX translator. There are a few others and you may see references to JSXTransformer as well. This has now been shelved in favour of Babel.

Let's install babel and get webpack to use it to translate:

```bash
npm install babel-loader babel-preset-es2015 babel-preset-react --save
```

There are three packages here. Babel loader is the base. It handles what type of translations will be done ( beacause babel can handle more than JSX ). 

We've gone for babel-preset-es2015 which will be used to translate any code we write in to standard ECMA5 javascript. More on this later.

We've also gone for babel-preset-react. Babel could have taken the <h1>Hi Team!</h1> and turned it into the original, non-react javascript. With this plugin we will tell it to use React.createElement to create our element. 

Essentially we've just told babel to translate in to React and ECMA5.

Now we need to tell babel to use these languages. More config files are needed:

```bash
touch .babelrc
```

In .babelrc:

```javascript
{
  "presets" : ["es2015", "react"]
}
```

Finally we need to tell ***webpack*** to use ***babel***:

Open webpack.config.js and add the following to your config object:

```javascript
...
path: BUILD_DIR,
    filename: 'bundle.js'
},
// add from here
module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : JS_DIR,
        loader : 'babel'
      }
    ]
  }
```

Now run webpack again. This time webpack will use babel to translate the JSX and will output a file called bundle.js in the public folder. Open this file up and take a look.

All the code at the top is used by webpack for pulling in dependencies and such and we can ignore it. Scroll to the bottom and you should see your translated code:

```javascript
ReactDOM.render(
	React.createElement(
	  'h1',
	  null,
	  'Hi Team!'
	), 
	document.getElementById('container')
);
```

Hopefully you can see that babel has translated <h1>Hi Team!</h1> in to : 

```javascript
React.createElement(
	  'h1',
	  null,
	  'Hi Team!'
)
```

This is the "reactified" ( I just made that word up ), ECMA5 javascript.

The only thing we have to do now to test this is to swap our index.js file in the index.html file for the webpacked version.

```html
...
	<script src="public/bundle.js"></script>
</body>
```

We could get webpack to do a bunch of other things for us too like minification and obfuscation. But one thing at a time...

Reload your page and this time it will be being rendered by React.

## Watch

It goes without saying that we should never edit the bundle.js. Any changes we made would be overwritten the next time we compiled. 

But it's a pain to keep running webpack everytime we change something. There are quite a few ways of automating this. But the simplest one is to use webpack watch:

```bash
webpack -d --watch
```
Webpack is now watching for any changes you make to the included files. Make a changes to index.jsx and you should see in the terminal that webpack immediately rebuilds your bundle.

## Gotchas

Because we're now mixing javascript and HTML ( good god! ) together there are some conflicts between words that are used in both.

For example, "class" is a keyword in javascript and HTML. If we write something like:

```javascript
ReactDOM.render(
  <h1 class="header">Hi Team Amazing!</h1>, 
  document.getElementById('container')
);
```

Babel will see the word class as javascript. So in JSX a css class becomes:

```javascript
ReactDOM.render(
  <h1 className="header">Hi Team Amazing!</h1>, 
  document.getElementById('container')
);
```

There are a few more of these gotchas and you can view them [here](https://facebook.github.io/react/docs/jsx-gotchas.html)

Now that we can build with React and JSX we can move on to the cooler features.

## ES6

Through this whole course we've been learning the current version of javascript but there is a new one coming. ECMA6 adds a lot of new features ( including support for classes ). 

ECMA6 has support in many modern browsers but not all. Because we're using webpack and babel to translate our JSX in to ECMA5 we can also use it to translate from ECMA6 and JSX at the same time back down to ECMA5. This means it can be used everywhere.

We won't be writing in ECMA6 for this module but you may see it in examples you find on the web so don't be surprised when you see something like this:

```javascript

class App extends React.Component {
  render () {
    return (
      <div>
        <p> Hello React!</p>
        <AwesomeComponent />
      </div>
    );
  }
}
```

It's not hugely different. But we can't use it yet. So don't get it confused!

## Summary

You just:

	* Learned that React is a UI Library for rendering pages
	* Learned that React is often used with JSX
	* Saw that JSX is a combination of javascript and HTML
	* Found that JSX isn't supported by most browsers and needs to be "translated"
	* Saw how to set up webpack and babel to translate JSX
	* Rendered a simple header using React and ReactDOM
	* Had a brief intro to ECMA6

	




