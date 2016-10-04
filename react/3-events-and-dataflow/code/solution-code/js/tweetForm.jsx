
var TweetForm = React.createClass({

    getInitialState: function() {

        return {
          message: ""
        }

    },

    handleClick : function(e) {
      
      this.props.createNew(
        {
          message: this.state.message,
          author: "@sparta"
        }
      )

    },

    handleChange: function(e) {

      this.setState({
        message: e.target.value
      });

    },

    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" placeholder="Write a message" onChange={this.handleChange} value={this.state.message} />
              <input type="button" value="Tweet" onClick={this.handleClick} />
            </div>
        );
    }
});

module.exports = TweetForm;