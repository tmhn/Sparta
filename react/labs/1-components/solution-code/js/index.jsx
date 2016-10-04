var TwitterFeed = require('./twitterFeed.jsx');

var dummyTweets = [
  {
    "message":"#react #dom #hashtag",
    "author" : "taghash",
    "image" : "images/profile-icon.png"
  },
  {
    "message":"Commit messages end up looking like this",
    "author" : "mashtag",
    "image" : "images/profile-icon.png"
  },
  {
    "message":"Why are the react docs so terrible?",
    "author" : "bob",
    "image" : "images/profile-icon.png"
  }

];

ReactDOM.render(
  <TwitterFeed tweets={dummyTweets}/>, 
  document.getElementById('container')
);