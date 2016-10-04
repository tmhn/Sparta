var TweetCount = React.createClass({
  
  render: function() {

    return (

      <span className="tweetCount">{this.props.tweets.length} tweets</span>

    )

  }

});

module.exports = TweetCount;