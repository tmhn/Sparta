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

	ReactDOM.render(React.createElement(TwitterFeed, null), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var TweetList = __webpack_require__(2);
	var TweetForm = __webpack_require__(4);

	var dummyTweets = [{
	  message: "We love react",
	  author: "@bob"
	}, {
	  message: "We hate react",
	  author: "@steve"
	}, {
	  message: "We love everything",
	  author: "@bobsmith"
	}];

	var TwitterFeed = React.createClass({
	  displayName: 'TwitterFeed',

	  render: function render() {

	    return React.createElement(
	      'div',
	      { className: 'twitter_feed' },
	      React.createElement(TweetForm, null),
	      React.createElement(TweetList, { tweets: dummyTweets })
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
	      return React.createElement(Tweet, { key: index, message: tweet.message, author: tweet.author });
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
/***/ function(module, exports) {

	"use strict";

	var TweetForm = React.createClass({
	  displayName: "TweetForm",


	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "new_tweet" },
	      React.createElement("input", { type: "text", id: "tweet_text" }),
	      React.createElement("input", { type: "button", value: "Tweet" })
	    );
	  }
	});

	module.exports = TweetForm;

/***/ }
/******/ ]);