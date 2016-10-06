var AppDispatcher = require('../dispatchers/appDispatcher.js');


var ComponentOne = React.createClass({

  handleClick: function() {

    AppDispatcher.dispatch({
      action : "CLICKED"
    });

    axios.get("http://api.icndb.com/jokes/random").then(function(resp){

      console.log(resp.data);
      
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