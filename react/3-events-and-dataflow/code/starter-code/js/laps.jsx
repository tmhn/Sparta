var Laps = React.createClass({

  getDefaultProps: function() {

    return {
      laps :[]
    }

  },

  render: function() {

    var laps = this.props.laps.map(function(lap, i){

      return (
        <div className="lap" key={i}>
          #{i + 1}
          <div className="ticker">
            {lap.hours}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {lap.minutes}
          </div>
          <div className="separator">:</div>
          <div className="ticker">
            {lap.seconds}
          </div>
        </div>
      )

    });

    return (
      <div className="laps">
        {laps}
      </div>
    )

  }

});

module.exports = Laps;