var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');

var dummyTweets = [
  {
    message: "React is great!",
    author: "@steveyblam"
  },
  {
    message: "React is ok!",
    author: "@steveybob"
  },
  {
    message: "React is rubbish!",
    author: "@spartan"
  }
];

var TwitterFeed = React.createClass({
    render: function(){
        return (
            <div className="twitter_feed">
                <TweetForm/>
                <TweetList tweets={dummyTweets}/>
            </div>
        );
    }
});

module.exports = TwitterFeed;