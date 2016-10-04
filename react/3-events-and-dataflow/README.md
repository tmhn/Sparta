# Events and State

## Timing

This lesson should take between 60 and 90 minutes

## Pre-requisites

* React components
* Webpack

## This lesson covers

* State
* Handling Events
* Callbacks

We've seen how to make data flow down through our tree of components. But getting them to talk to eachother is slightly harder. 

The idea of data flowing down the tree is very important. But it can be a tricky concept to get to grips with.

It's probably best to think about why it's useful. Imagine a Single Page Application that has a lot of moving parts like facebook. When someone posts on your wall it appears immediately. But it also adds a notification in the header bar. 

If someone likes that post you'll get a notification but the post will also be updated. If someone then comments you'll get another notification and the comments bar will update.

It's easy to see how many different parts of the page are interconnected. Now imagine trying to manage this with javascript. Trying to figure out which parts of the page need to be updated and how they should change would be a nightmare.

React takes the opposite approach. We start with the data. Each component keeps an eye on the data of our app and listens for changes in it. Each component knows which parts of the data it's interested in and how to change itself if the data changes. 

To make the whole app change it's "state" we just have to change the data and let every component figure out what to do for themselves.

Seeing as some components create other components we can very quickly build up a tree of components through which data flows.

## State

State is another store of data inside the component just like props. But state is the data that our component will "watch" for changes. We'll use it to make decisions and to change how the component will be rendered. A good way to think about it is that it's an object that represent what "state" the component is currently in.

The pattern looks like this:

* Create a variable in the state for something that might change
* Use that variable when you render the component
* To change that part of an element, change the state then re-render
* Never interact with the html element directly

That may sound complicated but it's actually very easy.

Let's look at the clock component in the starter code. 


```javascript
var Clock = React.createClass({

  getInitialState: function() {

    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null
    }

  },

  render: function() {

    return (
      <div className="clock">
        <div className="clockface">
          <div className="ticker">
            {this.state.hours}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {this.state.minutes}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {this.state.seconds}
          </div>
        </div>
        <div className="controls">
          <input type="button" value="Lap" className="lap_button" />
        </div>
      </div>
      
    )

  }

});

module.exports = Clock;
``` 

You can see that we've used a function called getInitialState to create the starting point for out component. Seconds, minutes and hours are all set to 0. 

Looking at the render function you can see that we've used those state variables to render parts of the component.

That's the first part taken care of. How can we update the seconds counter? Well from our list above, we're not allowed to interact with the html element directly. We can only change the state.

So to change the value in the seconds div we have to change the state then re-render the component.

Let's start a timer when the component is first rendererd using the componentDidMount function:

```javascript
componentDidMount: function() {

	 // create an interval and run an updateTimer function ever 1000 milliseconds
    this.state.interval = setInterval(this.updateTimer, 1000)

},

updateTimer : function() {

	// increase the seconds by one
	this.state.seconds++;

}
```

If you run webpack and open the page you'll see... nothing happening. That' because React will only re-render the component for us if we call the setState function. So let's do that now:

```javascript
updateTimer : function() {

	// increase the seconds by one
	this.state.seconds++;
	
	// call setState
	this.setState({
		seconds: this.state.seconds
	});

}
```

Rerun the page and you should now see the seconds increasing by one each second. What's important to note here is that we haven't interacted with the seconds div directly. We have changed the state that was used to create it and then re-rendered the component with the new information.

> EXERCISE ( 10 Minutes ) : In the updateTimer function write some code that will increase the minutes every 60 seconds and increase the hours every 60 minutes. Seconds and minutes should reset to 0 when they reach 60.

You should have something like the following:

```javascript
updateTimer : function() {

      // increase the seconds by 1
      this.state.seconds++;

      if(this.state.seconds > 59) {
        this.state.minutes++;
        this.state.seconds = 0;
      }

      if(this.state.minutes > 59) {
        this.state.hours++;
        this.state.minutes = 0;
      }

      if(this.state.hours >= 59) {
        // reset everything
        this.state.seconds = 0;
        this.state.minutes = 0;
        this.state.hours   = 0;
      }

      // call set state to force a re-render
      this.setState({
        seconds: this.state.seconds,
        minutes: this.state.minutes,
        hours: this.state.hours
      });

},
```

Notice how we call setState now with seconds, minutes and hours.


## Handling events

In the timer code we've used an interval to update the state at a regular interval. But what if we want to respond to something the user has done. Like clicking a button or typing in a box.

Vanilla javascript has addEventListener and jQuery has few function like click() and change(). But we can't access the dom element in React anymore. So we actually have to go a bit old school and add the eventListener "inline". This isn't so bad as it sounds as babel and webpack will actual turn these in to nice clean javascript for us. But that's how we're going to do it the JSX.

Let's try and listen for the lap button being clicked. The inline listeners are fairly similar to standard HTML but we use camelCase instead of hyphens:

```javascript
<div className="controls">
          <input type="button" value="Lap" className="lap_button" onClick={this.saveLap} />
        </div>
```

We'll also need a function to handle it:

```javascript
saveLap : function() {

    console.log(this.state);

},

getInitialState: function() {

    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      interval: null
    }

},
...
```

All we've done so far is log the current state. But we can use event listeners to update the current state and thus make changes to how the component is displayed.

> EXERCISE ( 5 Mins ) : In the saveLap function reset the timer back to all zeroes.

This is actually now quite easy. All we need to do is change the data in the state.

```javascript
saveLap : function() {

    this.setState({
    	seconds: 0,
    	minutes: 0,
    	hours: 0
    });

},
```

Because we've called setState the component will be re-rendered with the now empty state.


## Callbacks

You may have noticed that there is an empty lap list in our app that is not being used. We'd like to fill that with data from the clock whenever we hit the lap button. 

But we have a problem. The clock component doesn't have access to the laps list component. So how can we make them talk to each other.

Remember we're only allowed to change data and all the data has to flow ***down*** our component tree. So if we want the lap list to update we need to decide which component will ***own*** that data. 

It could belong to the list itself but how would we then change it from the clock by flowing it down? We can't. So the answer is that the Timer component has to ***own*** the lap list data. So we will but it in the state of the Timer. 

```javascript
var Timer = React.createClass({

  getInitialState: function() {

    return {
      laps:[]
    }

  },
  
...  
```

This means that if we can send an event up the tree from Clock ( perfectly acceptable ) then Timer can update the laps array in it's state and then re-render the Laps component with the new data.

> NOTE: The easiest way to figure out which component should ***own*** some data in it's state is to go up the list until you find a component that only shares the data with it's children but not with siblings. That component should own it.

We can now pass this laps array in to the Laps component:

```javascript
<div className="timer">
      <Clock />
      <Laps laps={this.state.laps} />
</div>
```

So what does this mean? It means that if we can update the laps in the Timer state the laps list will be re-rendered with the new data!

But we still have one question. How can we let the Clock update the state in Timer?

The answer is to use callbacks. We can give Clock a function to call when it's creating a new lap and get that function to update the state in Timer:

```javascript
<div className="timer">
  <Clock onLap={this.handleLap} />
  <Laps laps={this.state.laps} />
</div>
```

And we need a function to handle it:

```javascript
handleLap: function(lap) {
	this.state.laps.push(lap);
	this.setState({
		laps: this.state.laps
	});
}
```

Now that Clock has this function available in it's props it can call it when a new lap is available:

```javascript
saveLap : function() {

		// call the callback with the new lap
		this.props.onLap(this.state);

      // update the state and re-render
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0
      });

  },
```

## Summary

You just learned:

* That state is used to control all the aspects of your component
* You cannot change HTML elements you can only change the state
* Changing the state causes the component to re-render
* The owner of the data is the highest component up the tree that only shares it with it's children
* You can communicate up the chain using call backs
* You can use events to listen for user actions that should change the state


