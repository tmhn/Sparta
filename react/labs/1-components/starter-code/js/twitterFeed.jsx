var TweetList = require('./tweetList.jsx');
var TweetForm = require('./tweetForm.jsx');

var dummyTweets = [
  {
    message: "We love react",
    author: "@bob"
  },
  {
    message: "We hate react",
    author: "@steve"
  },
  {
    message: "We love everything",
    author: "@bobsmith"
  }
];

var TwitterFeed = React.createClass({
  render: function() {

    return (
      <div className="twitter_feed">
        <TweetForm/>
        <TweetList tweets={dummyTweets} />
      </div>
    )
  }
});

module.exports = TwitterFeed;