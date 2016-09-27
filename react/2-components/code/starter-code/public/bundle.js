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
/***/ function(module, exports) {

	"use strict";

	ReactDOM.render(React.createElement(
	  "div",
	  { className: "twitter_feed" },
	  React.createElement(
	    "div",
	    { className: "new_tweet" },
	    React.createElement("input", { type: "text", id: "tweet_text" }),
	    React.createElement("input", { type: "button", value: "Tweet" })
	  ),
	  React.createElement(
	    "div",
	    { className: "tweets" },
	    React.createElement(
	      "div",
	      { className: "tweet" },
	      React.createElement(
	        "div",
	        { className: "message" },
	        "React is great!"
	      ),
	      React.createElement(
	        "div",
	        { className: "author" },
	        "@steveyblam"
	      )
	    ),
	    React.createElement(
	      "div",
	      { className: "tweet" },
	      React.createElement(
	        "div",
	        { className: "message" },
	        "React is great!"
	      ),
	      React.createElement(
	        "div",
	        { className: "author" },
	        "@steveyblam"
	      )
	    ),
	    React.createElement(
	      "div",
	      { className: "tweet" },
	      React.createElement(
	        "div",
	        { className: "message" },
	        "React is great!"
	      ),
	      React.createElement(
	        "div",
	        { className: "author" },
	        "@steveyblam"
	      )
	    )
	  )
	), document.getElementById('container'));

/***/ }
/******/ ]);