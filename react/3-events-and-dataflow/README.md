# Events and Dataflow

## Timing

This lesson should take between 45 and 60 minutes

## Pre-requisites

* React components
* Webpack

## This lesson covers

* Handling Events
* Dataflow and state
* Re-rendering

We've seen how to make data flow down through our tree of components. But getting them to talk to eachother is slightly harder. 

React ( and Flux which we'll look at later ) tries to enforce the idea of data only flowing in one direction. But that doesn't mean we can't pass events back up the chain.

This will feel a little odd at first but it should eventually make sense and your code will be ready to use with a bigger framework.

## Handling events

We've gotten quite used to frameworks and packages providing their own way of doing things. Especially handling events.

React doesn't enforce any specific way of handling events. But we can use simple callbacks just like we did in basic javascript.

Let's make our tweetForm button respond to being clicked. For this we'll need two things. A way to bind an event listener and a callback function to run when it occurs. The callback function is easy. It can live in our configuration alongside the render function:

```javascript
...

	handleClick : function() {

      console.log('button clicked');

    },

    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" placeholder="Write a message" />
              <input type="button" value="Tweet" />
            </div>
        );
    }
    
...    
```

React will make this handleClick function available inside the component once it's rendered.

But how do we bind it? With vanilla javascript or jQuery we would have done something like:

```javascript
$("#tweet_button").click(this.handleClick);
```

The trouble is we're working in JSX. It's not a real DOM yet. So React let's us add listeners the old fashioned way, by adding them directly to the component:

```javascript
    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" placeholder="Write a message" />
              <input type="button" value="Tweet" onClick={this.handleClick} />
            </div>
        );
    }
```
