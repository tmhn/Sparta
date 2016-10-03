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

	var TweetForm = __webpack_require__(2);
	var TweetList = __webpack_require__(3);

	var TwitterFeed = React.createClass({
	    displayName: 'TwitterFeed',


	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'twitter_feed' },
	            React.createElement(TweetForm, null),
	            React.createElement(TweetList, { tweets: this.props.tweets })
	        );
	    }
	});

	module.exports = TwitterFeed;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var TweetForm = React.createClass({
	    displayName: 'TweetForm',


	    getInitialState: function getInitialState() {
	        return { text: '' };
	    },

	    handleChange: function handleChange(event) {
	        this.setState({ text: event.target.value });
	    },

	    handleClick: function handleClick(event) {
	        AppDispatcher.dispatch({
	            actionName: 'new-tweet',
	            newItem: this.state
	        });
	    },

	    render: function render() {
	        return React.createElement(
	            'div',
	            { className: 'new_tweet' },
	            React.createElement('input', { type: 'text', id: 'tweet_text', onChange: this.handleChange, placeholder: 'Write a message', value: this.state.text }),
	            React.createElement('input', { type: 'button', value: 'Tweet', onClick: this.handleClick })
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
	  getDefaultProps: function getDefaultProps() {
	    return {
	      tweets: []
	    };
	  },


	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "tweets" },
	      this.props.tweets.map(function (tweet, i) {
	        return React.createElement(Tweet, { message: tweet.message, author: tweet.author, key: i });
	      })
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

/***/ }
/******/ ]);