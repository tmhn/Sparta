var Tweet = require('./tweet.jsx');

var TweetList = React.createClass({

  render: function() {

    var tweets = this.props.tweets.map((function(tweet, i){
            return (
              <Tweet message={tweet.message} author={tweet.author} image={tweet.image} key={i} index={i} handleDelete={this.props.handleDelete} />
            )
    }).bind(this));

    tweets.reverse();

    return (
      <div className="tweets">
         {tweets}
      </div>
    )
  }

});

module.exports = TweetList;