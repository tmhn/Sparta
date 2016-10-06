var AppDispatcher = require('../dispatchers/appDispatcher.js');

var ComponentOne = React.createClass({

  handleClick: function() {

    AppDispatcher.handleViewAction("CLICKED");

  },

  render: function() {

    return (
      <div className="clicker">
        <input type="button" onClick={this.handleClick} value="Click Me"/>
      </div>
    )

  }

});

module.exports = ComponentOne;