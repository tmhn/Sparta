var ComponentOne = React.createClass({

  handleClick: function() {

    console.log('clicked');

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