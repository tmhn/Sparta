var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');
var UserLogin = require('./UserLogin.jsx');


var TwitterFeed = React.createClass({

    getInitialState: function() {

        return {
          tweets: [
              {
                message: "React is great!",
                author: "@steveyblam",
                image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
              },
              {
                message: "React is ok!",
                author: "@steveybob",
                image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
              },
              {
                message: "React is rubbish!",
                author: "@spartan",
                image: "http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
              }
            ],
            current_user: ""
          };

    },

    handleDelete :function(index) {

      this.state.tweets.splice(index,1);
      this.setState({
        tweets: this.state.tweets
      });

    },

    handleCreate : function(tweet) {


        // add the tweet to the array
        var newTweets = this.state.tweets;

        // set the username
        tweet.author = this.state.current_user.username;
        tweet.image = this.state.current_user.image;

        newTweets.push(tweet);

        // set state with the new array to force a re render
        this.setState({
          tweets: newTweets
        });

    },

    handleClear : function() {

        this.setState({
          tweets:[]
        });

    },

    handleLogin : function(user) {

      this.setState({
        current_user : user
      });

    },

    render: function(){
        return (
            <div className="twitter_feed">
                <UserLogin login={this.handleLogin} />
                <TweetForm createNew={this.handleCreate}/>
                <TweetList tweets={this.state.tweets} handleDelete={this.handleDelete}/>
                <div>
                  <a href="#" onClick={this.handleClear}>Clear Tweets</a>
                </div>
            </div>
        );
    }
});

module.exports = TwitterFeed;