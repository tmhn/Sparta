var appDispatcher = require('../dispatchers/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');

var ComponentOne = React.createClass({

  handleClick: function(e) {

    appDispatcher.dispatch({
      action: appConstants.CLICKED
    });

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