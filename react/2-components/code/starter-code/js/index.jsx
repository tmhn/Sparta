ReactDOM.render(
  <div className="twitter_feed">
    <div className="new_tweet">
      <input type="text" id="tweet_text" />
      <input type="button" value="Tweet" />
    </div>
    <div className="tweets">
      <div className="tweet">
        <div className="message">
          React is great!
        </div>
        <div className="author">
          @steveyblam
        </div>
      </div>
      <div className="tweet">
        <div className="message">
          React is great!
        </div>
        <div className="author">
          @steveyblam
        </div>
      </div>
      <div className="tweet">
        <div className="message">
          React is great!
        </div>
        <div className="author">
          @steveyblam
        </div>
      </div>
    </div>
  </div>, 
  document.getElementById('container')
);