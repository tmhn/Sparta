var CharacterCount = React.createClass({
  
  getInitialState : function(){

      return {  
        max: 140
      }

  },

  render: function() {

    return (

      <div className="characterCount">{this.state.max - this.props.count} characters remaining</div>

    )

  }

});

module.exports = CharacterCount;