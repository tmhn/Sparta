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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
/* 1 */
/***/ function(module, exports) {

"use strict";
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

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
"use strict";

var TweetForm = React.createClass({
    displayName: "TweetForm",

    render: function render() {
        return React.createElement(
            "div",
            { className: "new_tweet" },
            React.createElement("input", { type: "text", id: "tweet_text", placeholder: "Write a message" }),
            React.createElement("input", { type: "button", value: "Tweet" })
        );
    }
});

module.exports = TweetForm;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var Tweet = __webpack_require__(1);

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
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var TwitterFeedRoot = __webpack_require__(5);

ReactDOM.render(React.createElement(TwitterFeedRoot, null), document.getElementById('container'));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var TwitterFeed = __webpack_require__(0);

var TwitterFeedRoot = React.createClass({
  displayName: "TwitterFeedRoot",


  getInitialState: function getInitialState() {
    return {
      tweets: []
    };
  },

  componentDidMount: function componentDidMount() {

    var self = this;

    axios.get("http://localhost:3000/api/tweets").then(function (result) {
      self.setState({
        tweets: result.data
      });
    });
  },

  render: function render() {
    return React.createElement(TwitterFeed, { tweets: this.state.tweets });
  }

});

module.exports = TwitterFeedRoot;

/***/ }
/******/ ]);