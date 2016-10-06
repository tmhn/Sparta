var AppDispatcher = require('../dispatchers/appDispatcher.js');
var CountStore = require('../stores/countStore.js');

var ComponentTwo = React.createClass({

  componentDidMount : function() {

      CountStore.on('change' , this.handleChange);

  },

  handleChange: function() {

      this.setState({
        count: CountStore.getCount()
      })

  },

  getInitialState: function() {

    return {
      count: CountStore.getCount(),
      time : Date.now()
    }

  },

  render: function() {

    return (
      <div>
        <div className="counter">
          Clicked {this.state.count} times
        </div>
        <div className="time">
          Last click was {this.state.time}
        </div>
      </div>
    )

  }

});

module.exports = ComponentTwo;