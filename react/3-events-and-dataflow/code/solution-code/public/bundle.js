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

	var Clock = __webpack_require__(3);
	var Laps = __webpack_require__(2);

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
	      React.createElement(Clock, { onLap: this.handleLap }),
	      React.createElement(Laps, { laps: this.state.laps })
	    );
	  }

	});

	module.exports = Timer;

/***/ },
/* 2 */
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Laps = __webpack_require__(2);

	var Clock = React.createClass({
	  displayName: "Clock",


	  getInitialState: function getInitialState() {

	    return {
	      hours: 0,
	      minutes: 0,
	      seconds: 0
	    };
	  },

	  componentDidMount: function componentDidMount() {

	    setInterval(this.updateTimer, 1000);
	  },

	  updateTimer: function updateTimer() {

	    // increase the seconds by 1
	    this.state.seconds++;

	    if (this.state.seconds > 59) {
	      this.state.minutes++;
	      this.state.seconds = 0;
	    }

	    if (this.state.minutes > 59) {
	      this.state.hours++;
	      this.state.minutes = 0;
	    }

	    if (this.state.hours >= 59) {
	      // reset everything
	      this.state.seconds = 0;
	      this.state.minutes = 0;
	      this.state.hours = 0;
	    }

	    // call set state to force a re-render
	    this.setState({
	      seconds: this.state.seconds,
	      minutes: this.state.minutes,
	      hours: this.state.hours
	    });
	  },

	  saveLap: function saveLap() {

	    // call the callback with the new lap
	    this.props.onLap(this.state);

	    // update the state and re-render
	    this.setState({
	      seconds: 0,
	      minutes: 0,
	      hours: 0
	    });
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
	        React.createElement("input", { type: "button", value: "Lap", className: "lap_button", onClick: this.saveLap })
	      )
	    );
	  }

	});

	module.exports = Clock;

/***/ }
/******/ ]);