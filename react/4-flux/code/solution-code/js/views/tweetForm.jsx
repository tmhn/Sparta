var TweetForm = React.createClass({

    getInitialState: function() {
       return {text: ''};
    },

    handleChange: function(event) {
        this.setState({text: event.target.value});
    },

    handleClick: function(event) {
      AppDispatcher.dispatch({
          actionName: 'new-tweet',
          newItem: this.state
      });
    },

    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" onChange={this.handleChange} placeholder="Write a message" value={this.state.text} />
              <input type="button" value="Tweet" onClick={this.handleClick} />
            </div>
        );
    }
});

module.exports = TweetForm;