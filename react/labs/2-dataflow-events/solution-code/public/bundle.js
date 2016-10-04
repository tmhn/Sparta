/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TwitterFeed = __webpack_require__(1);

	ReactDOM.render(React.createElement(
	  'div',
	  null,
	  React.createElement(TwitterFeed, null)
	), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TweetForm = __webpack_require__(2);
	var TweetList = __webpack_require__(3);
	var UserLogin = __webpack_require__(6);

	var TwitterFeed = React.createClass({
	  displayName: 'TwitterFeed',


	  getInitialState: function getInitialState() {

	    return {
	      tweets: [{
	        message: "React is great!",
	        author: "@steveyblam",
	        image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
	      }, {
	        message: "React is ok!",
	        author: "@steveybob",
	        image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
	      }, {
	        message: "React is rubbish!",
	        author: "@spartan",
	        image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
	      }],
	      current_user: ""
	    };
	  },

	  handleDelete: function handleDelete(index) {

	    this.state.tweets.splice(index, 1);
	    this.setState({
	      tweets: this.state.tweets
	    });
	  },

	  handleCreate: function handleCreate(tweet) {

	    // add the tweet to the array
	    var newTweets = this.state.tweets;

	    // set the username
	    tweet.author = this.state.current_user.username;
	    tweet.image = this.state.current_user.image;

	    newTweets.push(tweet);

	    // set state with the new array to force a re render
	    this.setState({
	      tweets: newTweets
	    });
	  },

	  handleClear: function handleClear() {

	    this.setState({
	      tweets: []
	    });
	  },

	  handleLogin: function handleLogin(user) {

	    this.setState({
	      current_user: user
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'twitter_feed' },
	      React.createElement(UserLogin, { login: this.handleLogin }),
	      React.createElement(TweetForm, { createNew: this.handleCreate }),
	      React.createElement(TweetList, { tweets: this.state.tweets, handleDelete: this.handleDelete }),
	      React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'a',
	          { href: '#', onClick: this.handleClear },
	          'Clear Tweets'
	        )
	      )
	    );
	  }
	});

	module.exports = TwitterFeed;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var TweetForm = React.createClass({
	  displayName: "TweetForm",


	  getInitialState: function getInitialState() {

	    return {
	      message: "",
	      count: 0
	    };
	  },

	  handleClick: function handleClick(e) {

	    this.props.createNew({
	      message: this.state.message,
	      author: "@sparta"
	    });

	    this.setState({
	      count: this.state.count + 1,
	      message: ""
	    });
	  },

	  handleChange: function handleChange(e) {

	    this.setState({
	      message: e.target.value
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "new_tweet" },
	      React.createElement("input", { type: "text", id: "tweet_text", placeholder: "Write a message", onChange: this.handleChange, value: this.state.message }),
	      React.createElement("input", { type: "button", disabled: this.state.count > 1, value: "Tweet", onClick: this.handleClick })
	    );
	  }
	});

	module.exports = TweetForm;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Tweet = __webpack_require__(4);

	var TweetList = React.createClass({
	  displayName: "TweetList",


	  render: function render() {

	    var tweets = this.props.tweets.map(function (tweet, i) {
	      return React.createElement(Tweet, { message: tweet.message, author: tweet.author, image: tweet.image, key: i, index: i, handleDelete: this.props.handleDelete });
	    }.bind(this));

	    tweets.reverse();

	    return React.createElement(
	      "div",
	      { className: "tweets" },
	      tweets
	    );
	  }

	});

	module.exports = TweetList;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var Tweet = React.createClass({
	  displayName: "Tweet",


	  handleDelete: function handleDelete(e) {

	    this.props.handleDelete(this.props.index);
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "tweet" },
	      React.createElement(
	        "div",
	        { className: "message" },
	        this.props.message
	      ),
	      React.createElement(
	        "div",
	        { className: "author" },
	        this.props.author
	      ),
	      React.createElement("div", { className: "profile_pic", style: { backgroundImage: 'url(' + this.props.image + ')' } }),
	      React.createElement(
	        "div",
	        { className: "deleteTweet" },
	        React.createElement(
	          "a",
	          { href: "#", onClick: this.handleDelete },
	          "delete"
	        )
	      )
	    );
	  }

	});

	module.exports = Tweet;

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var UserLogin = React.createClass({
	  displayName: "UserLogin",


	  getInitialState: function getInitialState() {

	    return {
	      users: [{
	        username: "@steveyblam",
	        image: "http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/actors/steve-blum-0.67.jpg"
	      }, {
	        username: "@bob",
	        image: "https://pbs.twimg.com/profile_images/378800000416870688/3c62c5fa578396dc6529700d73d1df87_400x400.jpeg"
	      }, {
	        username: "@sparta",
	        image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
	      }],
	      current_user: ""
	    };
	  },

	  handleClick: function handleClick(e) {

	    this.setState({
	      current_user: e.target.innerHTML
	    });

	    this.props.login(this.state.users[e.target.getAttribute('data-id')]);
	  },

	  render: function render() {

	    var users = this.state.users.map(function (user, i) {
	      return React.createElement(
	        "li",
	        { key: i },
	        React.createElement(
	          "a",
	          { href: "#", "data-id": i, onClick: this.handleClick },
	          user.username
	        )
	      );
	    }.bind(this));

	    return React.createElement(
	      "div",
	      { className: "user_list" },
	      React.createElement(
	        "ul",
	        null,
	        this.state.current_user ? null : users
	      )
	    );
	  }

	});

	module.exports = UserLogin;

/***/ }
/******/ ]);