var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');



var TwitterFeed = React.createClass({

    getInitialState: function() {

        return {
          tweets: [
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
            ]
          };

    },

    handleCreate : function(tweet) {

        console.log(tweet);

        // add the tweet to the array
        var newTweets = this.state.tweets;

        newTweets.push(tweet);

        // set state with the new array to force a re render
        this.setState({
          tweets: newTweets
        });

    },

    render: function(){
        return (
            <div className="twitter_feed">
                <TweetForm createNew={this.handleCreate}/>
                <TweetList tweets={this.state.tweets}/>
            </div>
        );
    }
});

module.exports = TwitterFeed;