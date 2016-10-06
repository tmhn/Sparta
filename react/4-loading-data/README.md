# Loading Data

# Components

## Timings

This lesson should take between 45 and 90 minutes to complete.

## Pre-requisites

* Webpack installed
* Node

## This lesson covers

* Data loading strategies
* AJAX
* The wrong way
* Root components
* DataComponents

React is not a framework. We said that in a previous lesson. React is a view rendering engine. That being said it does not have a built in method of loading data. Instead React leaves it entirely up to you how and when you load your data.

There are some common patterns that you will see. Firstly we need to choose how we will load the data before we choose where and when it should be done.

## AJAX

In our example we have a simple API server created in node that is going to supply the data to our frontend app. Our goal is to load this data and to feed it in to React to render.

We've previously used jQuery for making AJAX requests because it has a nice simple api. But jQuery and React don't always play to well together so it's probably best that we avoid it.

Luckily there is a nice AJAX only package called Axios which has the ***exact*** same syntax as jquery for making requests. So let's install and include that.

```bash
bower install --save axios
```

Then add this to the index.html file:

```html
<head>
...
<script src="bower_components/axios/dist/axios.min.js"></script>
...
</head>
```

We can now make a request to our server just like in jquery by using the axios object:

```javascript
axios.get("/api/tweets").then(function(data){

});
```

The question now is, where should we run this code. 

## The wrong way

It would be very tempting to have a component load it's own data. And it's certainly possible. Each component can take an optional componentDidMount function which runs when the component is first added to the DOM.

We could use this to run our AJAX call and make the data available internally. Let's try it. Open the twitterFeed.jsx file make the following changes:

```javascript
var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');


var TwitterFeed = React.createClass({

    getInitialState: function() {
        return {
          tweets: []
        }
    },

    componentDidMount: function() {
        
        var self = this;
        axios.get("http://localhost:3000/api/tweets")
             .then(function(result) {    
                self.setState({
                  tweets: result.data
                });
              });
    },  

...
``` 

We've introduced a new concept here, states. If props are data passed in from outside, states are data created by the component for it's own internal use.

Here we're loading the data from the API and assigning it to our internal state.

We can then ask for that data when we render the component much the same way we asked for props data:

```javascript
render: function(){
    return (
        <div className="twitter_feed">
            <TweetForm/>
            <TweetList tweets={this.state.tweets}/>
        </div>
    );
}
```

> QUESTION ( 5 Mins ) : This works well. So why is it not a good way to do things?

It's not good because it has locked our component down to a single use, loading tweets from that specific api. If we allow our component to have data passed in from outside then we can use it with data from any source.

So how else can we handle this? There are any number of ways to get data to our component. We're going to look at two options.

## A root component

We've already seen that our React components are hierarchical. So there's nothing to stop us from wrapping our entire app in a further component that handles data collection for us and distributes data to the various children.

Open the index.jsx file and create the component in there:

```javascript
var RootComponent = React.createClass({

  getInitialState : function() { 
       return  {
          tweets: []
       }
  },

  componentDidMount: function() {
     

  },

  render: function() {
    return (
      <TwitterFeed tweets={this.state.tweets}/>
    )
  }
});
```

We need to remove our axios loading script from the TwitterFeed itself and move it here:

```javascript

componentDidMount: function() {
     
	 // get all data for application
      axios.get("http://localhost:3000/api/tweets")
         .then(function(result) { 
            self.setState({
              tweets: result.data
            });
          });

},

```

Now we can render our global container and let it render our components.

```javascript
ReactDOM.render(
  <RootComponent />,
  document.getElementById('container')
)
```

> QUESTION ( 5 mins ) : What are the problems with this approach?

For a start, all our components have to be rendered in one place by the RootComponent so it's not very flexibile.

Secondly it means we have to do a lot of passing data down the tree. Root to Twitter, Twitter to TweetList and so on.

This method is best suited to when you have a small number of components to render and only a shallow component tree.


## DataComponents

If we want more control over which components are rendered where we could take the same approach but for each component.

We could for example wrap the TwitterFeed in a TwitterFeedRoot component that handles loading data just for the twitterFeed. 

Let's create a separate file for this:

```bash
touch js/twitterFeedRoot.jsx
```

Our Root component actually only provides data for the twitterFeed so far. So we can just steal the code from this and change the name:

```javascript
var TwitterFeed = require('./twitterFeed.jsx');

var TwitterFeedRoot = React.createClass({

  getInitialState: function() {
      return {
        tweets: []
      }
  },

  componentDidMount: function() {
      
      var self = this;
    
      axios.get("http://localhost:3000/api/tweets")
         .then(function(result) { 
            self.setState({
              tweets: result.data
            });
          });

  }, 

  render: function() {
    return (
      <TwitterFeed tweets={this.state.tweets} />
    )
  }

});

module.exports = TwitterFeedRoot;

```

This makes our component a little more reusable and tidies up the index.jsx file:

```javascript
var TwitterFeedRoot = require('./twitterFeedRoot.jsx');


ReactDOM.render(
  <TwitterFeedRoot />, 
  document.getElementById('container')
);
```

This is a little better than a global root component as it allows us to render different components in different places. It also brings the data loading a little closer to the component which solves our tree problem a little.

But it means a lot of extra components are created just for handling data.

This is a perfectly good solution for simple apps. But when things get a little more complicated we could do with a more dedicated way to load and distribute data.

We'll look at a few options in the next lesson.
 


## Summary

You just:

	* Saw that React does not specify a way to load data
	* Saw how to use states for data used internally
	* Saw how to use props for data passed in from outside
	* Learned some good places to load data that are not inside the component










