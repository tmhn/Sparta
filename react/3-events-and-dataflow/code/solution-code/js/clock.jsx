var Laps = require('./laps.jsx');

var Clock = React.createClass({

  getInitialState: function() {

    return {
      hours: 0,
      minutes: 0,
      seconds: 0
    }

  },

  componentDidMount: function() {

    setInterval(this.updateTimer, 1000)

  },

  updateTimer : function() {

      // increase the seconds by 1
      this.state.seconds++;

      if(this.state.seconds > 59) {
        this.state.minutes++;
        this.state.seconds = 0;
      }

      if(this.state.minutes > 59) {
        this.state.hours++;
        this.state.minutes = 0;
      }

        if(this.state.hours >= 59) {
          // reset everything
          this.state.seconds = 0;
          this.state.minutes = 0;
          this.state.hours   = 0;
        }

      // call set state to force a re-render
      this.setState({
        seconds: this.state.seconds,
        minutes: this.state.minutes,
        hours: this.state.hours
      });

  },

  saveLap : function() {

      // call the callback with the new lap
      this.props.onLap(this.state);

      // update the state and re-render
      this.setState({
        seconds: 0,
        minutes: 0,
        hours: 0
      });

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
          <input type="button" value="Lap" className="lap_button" onClick={this.saveLap} />
        </div>
      </div>
      
    )

  }

});

module.exports = Clock;