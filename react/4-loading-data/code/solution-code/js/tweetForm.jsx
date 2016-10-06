var TweetForm = React.createClass({
    render: function(){
        return (
            <div className="new_tweet">
              <input type="text" id="tweet_text" placeholder="Write a message" />
              <input type="button" value="Tweet" />
            </div>
        );
    }
});

module.exports = TweetForm;