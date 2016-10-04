var Tweet = require('./tweet.jsx');


var TweetList = React.createClass({

    getDefaultProps : function() {
      return {
        tweets: []
      }
    },

    render: function() {

        var tweets = this.props.tweets.map(function(tweet , index){
            return (
              <Tweet key={index} message={tweet.message} author={tweet.author} image={tweet.image} />
            )
        });

        return (
            <div className="tweets">
              {tweets}
            </div>
        )

    }

});

module.exports = TweetList;