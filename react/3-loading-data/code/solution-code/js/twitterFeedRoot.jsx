var TwitterFeed = require('./twitterFeed.jsx');

var TwitterFeedRoot = React.createClass({

  getInitialState: function() {
      return {
        tweets: []
      }
  },

  componentDidMount: function() {
      
      var self = this;
    
      axios.get("http://localhost:3000/api/tweets")
         .then(function(result) { 
            self.setState({
              tweets: result.data
            });
          });

  }, 

  render: function() {
    return (
      <TwitterFeed tweets={this.state.tweets} />
    )
  }

});

module.exports = TwitterFeedRoot;
