var AppDispatcher = require('../dispatchers/appDispatcher.js');

var ComponentThree =  React.createClass({

  componentDidMount : function() {

    AppDispatcher.register(this.handleAction);

  },

  getInitialState: function() {

    return {
      joke: ""
    }

  },

  handleAction : function(payload) {

    var self = this;

    if(payload.action == "CLICKED") {
      axios.get("http://api.icndb.com/jokes/random").then(function(resp){
        console.log(resp);
        self.setState({
          joke: resp.data.value.joke
        })
      });
    }
  },

  render: function() {

    return (
      <div className="joke">
        {this.state.joke}
      </div>
    )

  }

});


module.exports = ComponentThree;