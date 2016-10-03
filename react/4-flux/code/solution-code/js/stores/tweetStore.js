var EventEmitter = require('events');

function TweetStore() {

  this.tweets = [];

  this.getAll = function() {

      return this.tweets;

  }

}

module.exports = TweetStore;