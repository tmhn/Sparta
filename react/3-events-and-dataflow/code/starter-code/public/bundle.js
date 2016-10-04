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

	var Timer = __webpack_require__(1);

	ReactDOM.render(React.createElement(Timer, null), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Clock = __webpack_require__(2);
	var Laps = __webpack_require__(3);

	var Timer = React.createClass({
	  displayName: 'Timer',


	  getInitialState: function getInitialState() {

	    return {
	      laps: []
	    };
	  },

	  handleLap: function handleLap(lap) {
	    this.state.laps.push(lap);
	    this.setState({
	      laps: this.state.laps
	    });
	  },

	  render: function render() {

	    return React.createElement(
	      'div',
	      { className: 'timer' },
	      React.createElement(Clock, null),
	      React.createElement(Laps, null)
	    );
	  }

	});

	module.exports = Timer;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Laps = __webpack_require__(3);

	var Clock = React.createClass({
	  displayName: "Clock",


	  getInitialState: function getInitialState() {

	    return {
	      hours: 0,
	      minutes: 0,
	      seconds: 0
	    };
	  },

	  render: function render() {

	    return React.createElement(
	      "div",
	      { className: "clock" },
	      React.createElement(
	        "div",
	        { className: "clockface" },
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          this.state.hours
	        ),
	        React.createElement(
	          "div",
	          { className: "separator" },
	          ":"
	        ),
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          this.state.minutes
	        ),
	        React.createElement(
	          "div",
	          { className: "separator" },
	          ":"
	        ),
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          this.state.seconds
	        )
	      ),
	      React.createElement(
	        "div",
	        { className: "controls" },
	        React.createElement("input", { type: "button", value: "Lap", className: "lap_button" })
	      )
	    );
	  }

	});

	module.exports = Clock;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var Laps = React.createClass({
	  displayName: "Laps",


	  getDefaultProps: function getDefaultProps() {

	    return {
	      laps: []
	    };
	  },

	  render: function render() {

	    var laps = this.props.laps.map(function (lap, i) {

	      return React.createElement(
	        "div",
	        { className: "lap", key: i },
	        "#",
	        i + 1,
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          lap.hours
	        ),
	        React.createElement(
	          "div",
	          { className: "separator" },
	          ":"
	        ),
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          lap.minutes
	        ),
	        React.createElement(
	          "div",
	          { className: "separator" },
	          ":"
	        ),
	        React.createElement(
	          "div",
	          { className: "ticker" },
	          lap.seconds
	        )
	      );
	    });

	    return React.createElement(
	      "div",
	      { className: "laps" },
	      laps
	    );
	  }

	});

	module.exports = Laps;

/***/ }
/******/ ]);