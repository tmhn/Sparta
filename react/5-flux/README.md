# Flux

## Timings

This lesson should take between 90 and 120 minutes to complete.

## Pre-requisites

* Intro to react
* Components
* Loading Data

## This lesson covers

* Flux rules
* Dispatchers
* Getting components to share data
* Loading data

Flux is not a framework. Flux is a design pattern just like MVC. This means that we are free to implement the rules of flux in our own way but we still have to follow the rules. The rules help us to create a pattern like this:

## Dispatchers

We've used callbacks in previous lessons for communcating between parent and child. But what if we want to communicate with parts of the app that are not easy to reach with callbacks?

Flux allows us to pull in a global ( Really?? yes really! ) , shared object called a dispatcher. The start of the pattern is that every component sends messages through this single dispatcher. So lets' build one. We need to install the flux package and create some folders first:

```bash
npm install flux --save
mkdir js/dispatchers
touch js/dispatchers/appDispatcher.js
```

> NOTE : Notice that we're back to normal js files again

Our AppDispatcher is actually very simple:

```javascript
var Dispatcher = require('flux').Dispatcher;

var AppDispatcher = new Dispatcher();

module.exports = AppDispatcher;
```

We've require the flux package here and immediately ( in the same line ) grabbed the Dispatcher class from it. We've then created an instance of a dispatcher and exported.

This is actually important. Why can't we do this in the components when we need a dispatcher. Well we want anyone who need the appDispatcher to get the ***same*** instance of our AppDispatcher. By creating one and exporting it everyone will get the same instance. 

This is known as the singleton pattern. Imagine we were creating boxes in which to leave messages. If everyone created their own box and left their messages in their own they would never get messages from anyone else. If we all use the same box then we see everything.

### Sending actions

An action is just a message that everyone can receive. We use actions to broadcast events to the app. At the moment button one is handling it's own events. We'd like it to tell the whole app when the button has been clicked. So we'll need the appDispatcher:

```javascript
var appDispatcher = require('../dispatchers/appDispatcher.js');

var ComponentOne = React.createClass({

...
```

Sending a message with the appDispatcher is easy. We just have to use the dispatch method. 

```javascript
handleClick: function() {

    appDispatcher.dispatch({
      action: "CLICKED"
    });

},
```

We've given dispatch a "payload" which could actually be any data we like. Typically in Flux we send an object with an action property. This helps us to identify the action later.

If you run webpack now and click on the button... nothing will happen. That's because our appDispatcher is sending an action out but no-one is listening.

In Flux architecture components should not really listen for these events. They will listen for something else which we'll look at in a bit. But just to test, and ***only*** to test, let's make componentTwo listen for our action:

```javascript
	componentDidMount: function() {

      appDispatcher.register(this.handleAction);

  },

  handleAction : function() {

    console.log('the button in ComponentOne was clicked');

  },
```

ComponentDidMount is called by react when the component is first created. So this is a great place to register to listen for actions. We give the register function a function in our own component to handle the action.

So far it's only logging. Let's run it and make sure it works. 

So componentOne is sending out a message and componentTwo is listening for it and responding.

We can now use this function to update the state in componentTwo:

```javascript
handleAction : function(payload) {

   this.setState({
      count: this.state.count + 1
   })

},
```

Notice that we haven't use the payload yet. The payload is just a fancy word used in the Flux architecture for a an object of data about the event.

At the moment componentTwo is actually responding to ***any*** event. That's not good. If we had other things in our app sending actions it would increment the count for everything. We need to be specific. We can use the action we set in the payload to see if it's an action that we're interested in:

```javascript
handleAction : function(payload) {

	if(payload.action == "CLICKED") {

	   this.setState({
	      count: this.state.count + 1
	   })
   
   }

  },
```

### Housekeeping

There is one more little bit of housekeeping we should do to keep our code tidy. Having the "CLICKED" action as a string isn't a great idea. If we need to change this for some reason we would have to change it ***everywhere*** we've used it in the app. Currently we're using it in componentOne and componentTwo so that's already two places it would need to change.

We should really move this to it's own file. Let's create a constants file to store all these action names:

```bash
mkdir js/constants
touch js/constants/appConstants.js
```

In appConstants.js :


```
module.exports = {
	CLICKED : "clicked"
}
```

We can now pull these constants in to componentOne and componentTwo.

in componentOne :

```javascript
var appConstants = require('../constants/appConstants.js');

var ComponentOne = React.createClass({

  handleClick: function() {

    appDispatcher.dispatch({
      action: appConstants.CLICKED
    });

  },
  
...  
```

and in componentTwo :

```javascript
var appConstants = require('../constants/appConstants.js');

...

  handleAction : function(payload) {

   if(payload.action == appConstants.CLICKED) {

       this.setState({
          count: this.state.count + 1
       })
      
   }
  },
  
...  
```

> NOTE : Remember we've only done this to test. We'll be taking the action listeners out of componentTwo soon enough

## Stores

Stores are the next step in the chain. You can think of stores as globally ( yes globals again ) accessible states. By pulling the states out of our component multiple components can see the same data.

Stores are the only objects that should respond to actions. You may remember from our diagram that we are trying to get data and changes to flow downhill. 

So the stores listen for actions and change data accordingly. They then tell the views that there is a new state to ***react*** to.

Luckily a store is just a simple javascript object. Let's create one to store our count:

```bash
mkdir js/stores
touch js/stores/countStore.js
```

In the countStore:

```javascript

var _count = 0;

var CountStore =  {

  getCount: function() {
    return _count;
  }

};

module.exports = CountStore;
```
We've created a very basic object here. It has one private variable called count and a single function that can return it. Once again we're returning an instance. So any component that requires this store will get the same one. We're sharing it.

This has now become the owner of our count data. So let's update componentTwo to use this for data instead:

```javascript
var CountStore = require('../stores/countStore.js');

...

getInitialState: function() {

    return {
      count: CountStore.getCount()
    }

},
```

Our app is starting to look more like the Flux diagram now. We have two steps left. As we said earlier our components really shouldn't be the ones listening for actions. So let's take all the appDispatcher code out and move it to the store. The countStore will now look like this:

```javascript
var appDispatcher = require('../dispatchers/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var _count = 0;

var CountStore =  {

  getCount: function() {
    return _count;
  }

};


function handleAction(payload) {


   if(payload.action == appConstants.CLICKED) {

       _count++;
      
   }

}

appDispatcher.register(handleAction);

module.exports = CountStore;
```

So let's run through what's happening so far:

* componentOne is listening for clicks
* on a click componentOne uses the appDispatcher to send a message to the whole app
* The countStore listens for the CLICKED message and increments the count

We have one step to go. We have to get the CountStore to tell the components that there is some new data for them to render.

We could do this with the appDispatcher and some actions but we don't want to send it as a message to everyone.

So we use a different events package and ask the components to register for updates. The events package we need is built in to node so we don't need to install it but we do need another package called merge so let's install that:

```bash
npm install merge --save
```

In our count store code we will use the merge functions to combine the EventEmitter class with our store. This will effectively turn it into an EventEmitter with our extra functions included. CountStore will now look like this:

```javascript
var appDispatcher = require('../dispatchers/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var _count = 0;

var CountStore =  merge(EventEmitter.prototype , {

  getCount: function() {
    return _count;
  }

});

...
```

We also need to tell our CountStore to send an event when there is new data:


```javascript
...
function handleAction(payload) {


   if(payload.action == appConstants.CLICKED) {

       _count++;

       CountStore.emit('update');
      
   }

}

```

The final step to hook this up is to get componentTwo to listen for update events from the CountStore and to update the state when it happens. Here's the whole file:

```javascript
var CountStore = require('../stores/countStore.js');

var ComponentTwo = React.createClass({

  componentDidMount: function() {

		CountStore.on('update', this.handleDataChange);

  },
  
  handleDataChange : function() {
  
  	this.setState({
  		count: CountStore.getCount()
  	});
  
  },

  getInitialState: function() {

    return {
      count: CountStore.getCount()
    }

  },

  render: function() {

    return (
      <div className="counter">
        Clicked {this.state.count} times
      </div>
    )

  }

});

module.exports = ComponentTwo;

```


That's it. Our app now uses the Flux pattern to distribute data.

## Summary

You just:

	* Learned the flow of actions and data in a Flux app
	* Learned how to create a dispatcher
	* Learned how to dispatch events
	* Learned how to create a store
	* Saw that only store listen for actions
	* Register a component to listen for store updates









