var Clock = require('./clock.jsx');
var Laps = require('./laps.jsx');

var Timer = React.createClass({

  getInitialState: function() {

    return {
      laps:[]
    }

  },

  handleLap: function(lap) {
    this.state.laps.push(lap);
    this.setState({
      laps: this.state.laps
    });
  },

  render: function() {

    return (
    <div className="timer">
      <Clock onLap={this.handleLap} />
      <Laps laps={this.state.laps} />
    </div>
    )

  }

});

module.exports = Timer;