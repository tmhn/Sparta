var Laps = require('./laps.jsx');

var Clock = React.createClass({

  getInitialState: function() {

    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

  },

  render: function() {

    return (
      <div className="clock">
        <div className="clockface">
          <div className="ticker">
            {this.state.hours}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {this.state.minutes}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {this.state.seconds}
          </div>
        </div>
        <div className="controls">
          <input type="button" value="Lap" className="lap_button"/>
        </div>
      </div>
      
    )

  }

});

module.exports = Clock;