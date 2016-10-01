var TweetForm = require('./tweetForm.jsx');
var TweetList  = require('./tweetList.jsx');


var TwitterFeed = React.createClass({

    render: function(){
        return (
            <div className="twitter_feed">
                <TweetForm/>
                <TweetList tweets={this.props.tweets}/>
            </div>
        );
    }
});

module.exports = TwitterFeed;