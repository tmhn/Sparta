# Components

## Timings

This lesson should take between 45 and 90 minutes to complete.

## Pre-requisites

* Intro to react

## This lesson covers

* Thinking in components
* Reusable blocks
* Creating components
* Passing data

React encourages us to think in components and to separate our page in to blocks. Even more so than we did when we looked at partials, views and layouts in express ejs.

The idea behind a component is that it should be self contained. It holds it's own template, it's own logic and it manages it own data. 

This is obviously a bit of a departure from what we've been trying to do so far. But it has it's advantages. We are building Lego blocks. Lego blocks that can be reused anywhere with minimal fuss. So let's build some:

## Reusable blocks

As we said above, our goal is to separate our page in to logically self-contained units.

Open the starter code and have a look at the index.html. We've built our very own twitter clone ( well, just the template for the moment ).

> EXERCISE ( 10 Minutes ) : Think about how you would logically split this page in to components. Remember that a component can contain other components.

It's not an exact science splitting your page. But the structure we think makes sense is this:

#### Tweet

The tweet is the basic building block of the list. It contains the message and the author.

```html
<div className="tweet">
	<div className="message">
	  React is great!
	</div>
	<div className="author">
	  @steveyblam
	</div>
</div>
```

#### TweetList

```html
<div className="tweets">
  <Tweet />
  <Tweet />
  <Tweet />
</div>
```

The list of tweets would obviously contain tweets. We've pretended that there is a <Tweet /> tag available here to represent it. Funnily enough, if we set it up right, JSX and react will actually understand this!

#### TweetForm

```html
<div className="new_tweet">
      <input type="text" id="tweet_text" />
      <input type="button" value="Tweet" />
</div>
```

It's not quite a form but we'll call it that anyway. This component would be in charge of displaying the form and creating a new tweet.

#### TwitterFeed

```html
<div className="twitter_feed">
    <TwitterForm/>
    <TweetsList />
</div>
```

The TwitterFeed component is the whole lot put together. It contains a form and the list.


We haven't used this tag notation by accident. If we create components for each of these parts, JSX will recognise the tags and swap them for the real thing.

## Creating components

So let's set these up now. We need to create files for each of our components:

```bash
cd js
touch tweet.jsx tweetList.jsx tweetForm.jsx twitterFeed.jsx
cd ..
```

Let's create the Tweet first as it's the simplest part. Open the tweet.jsx file and enter the following. Remember that in JSX we can mix html and javascript together:

```javascript
var Tweet = React.createClass({

	render: function() {
		return (
			<div className="tweet">
	        <div className="message">
	          React is great!
	        </div>
	        <div className="author">
	          @steveyblam
	        </div>
	      </div>
		)
	}

});

module.exports = Tweet;
```

You should notice the module.exports line at the bottom. Isn't that just a node thing? Well no! Webpack uses the exact same system for handling dependencies that node does! That's lucky because we already know how to use it.

Let's do the TweetList next. In the tweetList.jsx file:

```javascript
var TweetList = React.createClass({

	render: function() {
		return (
			<div className="tweets">
			  <Tweet />
			  <Tweet />
			  <Tweet />
			</div>
		)
	}

});

module.exports = TweetList;
```

We're trying to use the Tweet tag in our JSX here. Just like in node, if we want to use it, we have to include it. Let's add the require script to the top of our file:

```javascript
var Tweet = require('./tweet.jsx');

var TweetList = React.createClass({

	render: function() {
		return (
			<div className="tweets">
			  <Tweet />
			  <Tweet />
			  <Tweet />
			</div>
		)
	}

});

module.exports = TweetList;
```

Let's try rendering our TweetList to see if it works. Open the index.jsx and change it to the following:

```javascript
var TweetList = require('./tweetList.jsx');


ReactDOM.render(
  <TweetList />, 
  document.getElementById('container')
);
```

run ```webpack``` to bundle all these new files together. Open the index.html file in the browser and you should now see your three tweets.

Now let's create the form. 

> EXERCISE (15 Mins) : Using what we've done so far try to create the TweetForm component in the tweetForm.jsx file. Then try to create the TwitterFeed component that include the TweetForm and the TweetList. Update the index.jsx file to render the TwitterFeed instead.


The TweetForm component should look as follows:

```javascript
var TweetForm = React.createClass({
    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" placeholder="Write a message" />
              <input type="button" value="Tweet" />
            </div>
        );
    }
});

module.exports = TweetForm;
```

The TweetForm doesn't have any dependencies so it's just a case of creating the component.

Now we can combine our TweetForm and TweetList to create the TwitterFeed component:

```javascript
var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');


var TwitterFeed = React.createClass({
    render: function(){
        return (
            <div className="twitter_feed">
                <TweetForm/>
                <TweetList/>
            </div>
        );
    }
});

module.exports = TwitterFeed;
```

Now let's update our index.jsx to render the whole thing:

```javascript
var TwitterFeed = require('./twitterFeed.jsx');


ReactDOM.render(
  <TwitterFeed />, 
  document.getElementById('container')
);
```

Remember to run webpack to compile the code then open your index.html file. You should now see that the whole twitter feed component is rendered.


## Passing data with props

Being able to use the components just like html tags is great. But so far it's all pretty static. We need to move some data around.

Let's create a dummy array of tweets and see if we can get the tweetList component to render them. Add the following to the twitterFeed file:

```javascript
...
var dummyTweets = [
  {
    message: "React is great!",
    author: "@steveyblam"
  },
  {
    message: "React is ok!",
    author: "@steveybob"
  },
  {
    message: "React is rubbish!",
    author: "@spartan"
  }
];
...
```

We need to get this list in to the tweetList component. We can pass it in using attributes on our <TweetList> tag and that will make it available inside the component!

```javascript
var dummyTweets = [
  {
    message: "React is great!",
    author: "@steveyblam"
  },
  {
    message: "React is ok!",
    author: "@steveybob"
  },
  {
    message: "React is rubbish!",
    author: "@spartan"
  }
];

var TwitterFeed = React.createClass({
    render: function(){
        return (
            <div className="twitter_feed">
                <TweetForm/>
                <TweetList tweets={dummyTweets}/>
            </div>
        );
    }
});
``` 

Notice the lack of speech marks. We use the brackets to tell JSX to pass in the data.

Inside the TweetList component we can access the array by calling this.props.tweets. Let's loop through all the tweets and add a <Tweet /> tag for each one we find:

```javascript
var TweetList = React.createClass({


  render: function() {
  
  	 var list = this.props.tweets.map(function(tweet, i){
		return (
			<Tweet key={i}/>
		)
	 });
  
    return (
      <div className="tweets">
      	 {list}
      </div>
    )
  }

});
```

This may look complex but we've only changed a few things. Firstly we want to run some code, our loop, inside the JSX. So to break out of the JSX we use the curly brackets. Everything inside the brackets will be treated as normal javascript when it's compiled.

We've then used a map function to create an array of <Tweet /> tags. It's important to remember that these will be ***translated*** in to javascript by webpack and babel. So it will actually end up being an array of elements.

Something like this:

```javascript
[
	React.createElement(Tweet, null),
	React.createElement(Tweet, null),
	React.createElement(Tweet, null)
]	
```

This isn't really important but it might help you to understand the JSX.

Finally we've added a key with the index of the loop. This is needed by React to keep track of the things we create in loops. If you don't have it you'll get an error.

The final step is to get the data for each tweet in to the <Tweet /> tags. We can do the same thing here. Use the attributes of the tag:

```javascript
var TweetList = React.createClass({

  render: function() {
  
  	 var list = this.props.tweets.map(function(tweet, i){
		return (
			<Tweet key={i} message={tweet.message} author={tweet.author}/>
		)
	 });
  
    return (
      <div className="tweets">
      	 {list}
      </div>
    )
  }

});
```

And now to use it in the Tweet component:

```javascript
var Tweet = React.createClass({

  render: function() {
    return (
      <div className="tweet">
          <div className="message">
            {this.props.message}
          </div>
          <div className="author">
            {this.props.author}
          </div>
        </div>
    )
  }

});

module.exports = Tweet;
```

## Summary

You just:

	* Learned that React helps us to split code in to reusable chunks
	* Learned how to create a component
	* Saw how we can use require and exports to pull one component in to another
	* Saw how to pass data between components









