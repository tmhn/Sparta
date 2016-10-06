var AppDispatcher = require('../dispatchers/appDispatcher.js');

var ComponentTwo = React.createClass({

  componentDidMount: function() {

      AppDispatcher.register(this.handleAction);

  },

  handleAction : function(payload) {


      if(payload.action == "CLICKED") {

        this.setState({
          count: this.state.count + 1
        });
      }

  },

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

module.exports = ComponentTwo;