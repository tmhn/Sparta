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

	var ComponentOne = __webpack_require__(6);
	var ComponentTwo = __webpack_require__(7);

	ReactDOM.render(React.createElement(
	  'div',
	  { className: 'components' },
	  React.createElement(ComponentOne, null),
	  React.createElement(ComponentTwo, null)
	), document.getElementById('container'));

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	"use strict";

	var ComponentOne = React.createClass({
	  displayName: "ComponentOne",


	  handleClick: function handleClick() {

	    console.log('clicked');
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "clicker" },
	      React.createElement("input", { type: "button", onClick: this.handleClick, value: "Click Me" })
	    );
	  }

	});

	module.exports = ComponentOne;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	var ComponentOne = React.createClass({
	  displayName: "ComponentOne",


	  getInitialState: function getInitialState() {

	    return {
	      count: 0
	    };
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "counter" },
	      "Clicked ",
	      this.state.count,
	      " times"
	    );
	  }

	});

	module.exports = ComponentOne;

/***/ }
/******/ ]);