var CharacterCount = require('./characterCount.jsx');

var TweetForm = React.createClass({
  
  getInitialState : function() {

    return {
      count: 0,
      text: ""
    }

  },

  handleChange: function(e) {
    this.setState({
      count: e.target.value.length,
      text: e.target.value
    });

  },

  handlePressed : function(e) {

    this.props.createNew({
        message:this.state.text, 
        author:"steveyblam",
        "image" : "images/profile-icon.png"
    });

    this.setState({
      count: 0,
      text: ""
    });

  },

  render: function() {

    return (
        <div className="new_tweet">
          <input type="text" id="tweet_text" onChange={this.handleChange} value={this.state.text} />
          <input type="button" value="Tweet" onClick={this.handlePressed} />
          <CharacterCount count={this.state.count} limit="140"/>
        </div>
    )
  }
});

module.exports = TweetForm;