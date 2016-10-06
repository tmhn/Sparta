var Tweet = require('./tweet.jsx');

var TweetList = React.createClass({

  getDefaultProps(){ 
       return  {
          tweets: []
       }
  },

  render: function() {
    return (
      <div className="tweets">
         {
          this.props.tweets.map(function(tweet, i){
            return (
              <Tweet message={tweet.message} author={tweet.author} key={i} />
            )
          })
        }
      </div>
    )
  }

});

module.exports = TweetList;