var ComponentOne = React.createClass({

  getInitialState: function() {

    return {
      count: 0
    }

  },

  render: function() {

    return (
      <div className="counter">
        Clicked {this.state.count} times
      </div>
    )

  }

});

module.exports = ComponentOne;