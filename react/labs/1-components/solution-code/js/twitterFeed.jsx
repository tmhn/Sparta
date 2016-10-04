var TweetList = require('./tweetList.jsx');
var TweetForm = require('./tweetForm.jsx');
var TweetCount = require('./tweetCount.jsx');

var TwitterFeed = React.createClass({

  getInitialState: function() {
      return {tweets: this.props.tweets};
  },

  handleNew: function(tweet) {

     var newTweets = this.state.tweets;
     newTweets.push(tweet);
     this.setState({
        tweets: newTweets
     });

  },

  render: function() {

    return (
      <div className="twitter_feed">
        <TweetForm createNew={this.handleNew}/>
        <TweetList tweets={this.props.tweets} />
        <TweetCount tweets={this.props.tweets} />
      </div>
    )
  }
});

module.exports = TwitterFeed;