var CountStore = require('../stores/countStore.js');

var ComponentTwo = React.createClass({

  componentDidMount: function() {

    CountStore.on('update', this.handleDataChange);

  },
  
  handleDataChange : function() {
  
    this.setState({
      count: CountStore.getCount()
    });
  
  },

  getInitialState: function() {

    return {
      count: CountStore.getCount()
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