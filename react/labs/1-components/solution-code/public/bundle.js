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

	"use strict";

	var TwitterFeed = __webpack_require__(1);

	var dummyTweets = [{
	  "message": "#react #dom #hashtag",
	  "author": "taghash",
	  "image": "images/profile-icon.png"
	}, {
	  "message": "Commit messages end up looking like this",
	  "author": "mashtag",
	  "image": "images/profile-icon.png"
	}, {
	  "message": "Why are the react docs so terrible?",
	  "author": "bob",
	  "image": "images/profile-icon.png"
	}];

	ReactDOM.render(React.createElement(TwitterFeed, { tweets: dummyTweets }), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TweetList = __webpack_require__(2);
	var TweetForm = __webpack_require__(4);
	var TweetCount = __webpack_require__(6);

	var TwitterFeed = React.createClass({
	  displayName: 'TwitterFeed',


	  getInitialState: function getInitialState() {
	    return { tweets: this.props.tweets };
	  },

	  handleNew: function handleNew(tweet) {

	    var newTweets = this.state.tweets;
	    newTweets.push(tweet);
	    this.setState({
	      tweets: newTweets
	    });
	  },

	  render: function render() {

	    return React.createElement(
	      'div',
	      { className: 'twitter_feed' },
	      React.createElement(TweetForm, { createNew: this.handleNew }),
	      React.createElement(TweetList, { tweets: this.props.tweets }),
	      React.createElement(TweetCount, { tweets: this.props.tweets })
	    );
	  }
	});

	module.exports = TwitterFeed;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Tweet = __webpack_require__(3);

	var TweetList = React.createClass({
	  displayName: "TweetList",


	  getDefaultProps: function getDefaultProps() {
	    return {
	      tweets: []
	    };
	  },

	  render: function render() {

	    var tweets = this.props.tweets.map(function (tweet, index) {
	      return React.createElement(Tweet, { key: index, message: tweet.message, author: tweet.author, image: tweet.image });
	    });

	    return React.createElement(
	      "div",
	      { className: "tweets" },
	      tweets
	    );
	  }

	});

	module.exports = TweetList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Tweet = React.createClass({
	  displayName: "Tweet",


	  getDefaultProps: function getDefaultProps() {

	    return {
	      message: "Default Message",
	      author: "Default"
	    };
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "tweet" },
	      React.createElement("div", { className: "profile_pic", style: { backgroundImage: 'url(' + this.props.image + ')' } }),
	      React.createElement(
	        "div",
	        { className: "message" },
	        this.props.message
	      ),
	      React.createElement(
	        "div",
	        { className: "author" },
	        this.props.author
	      )
	    );
	  }

	});

	module.exports = Tweet;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var CharacterCount = __webpack_require__(5);

	var TweetForm = React.createClass({
	  displayName: "TweetForm",


	  getInitialState: function getInitialState() {

	    return {
	      count: 0,
	      text: ""
	    };
	  },

	  handleChange: function handleChange(e) {
	    this.setState({
	      count: e.target.value.length,
	      text: e.target.value
	    });
	  },

	  handlePressed: function handlePressed(e) {

	    this.props.createNew({
	      message: this.state.text,
	      author: "steveyblam",
	      "image": "images/profile-icon.png"
	    });

	    this.setState({
	      count: 0,
	      text: ""
	    });
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "new_tweet" },
	      React.createElement("input", { type: "text", id: "tweet_text", onChange: this.handleChange, value: this.state.text }),
	      React.createElement("input", { type: "button", value: "Tweet", onClick: this.handlePressed }),
	      React.createElement(CharacterCount, { count: this.state.count, limit: "140" })
	    );
	  }
	});

	module.exports = TweetForm;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var CharacterCount = React.createClass({
	  displayName: "CharacterCount",


	  getInitialState: function getInitialState() {

	    return {
	      max: 140
	    };
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "characterCount" },
	      this.state.max - this.props.count,
	      " characters remaining"
	    );
	  }

	});

	module.exports = CharacterCount;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var TweetCount = React.createClass({
	  displayName: "TweetCount",


	  render: function render() {

	    return React.createElement(
	      "span",
	      { className: "tweetCount" },
	      this.props.tweets.length,
	      " tweets"
	    );
	  }

	});

	module.exports = TweetCount;

/***/ }
/******/ ]);