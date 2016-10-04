var Tweet = React.createClass({

  handleDelete : function(e) {

    this.props.handleDelete(this.props.index);

  },

  render: function() {
    return (
      <div className="tweet">
          <div className="message">
            {this.props.message}
          </div>
          <div className="author">
            {this.props.author}
          </div>
          <div className="profile_pic" style={{backgroundImage: 'url(' + this.props.image + ')'}}></div>
          <div className="deleteTweet">
            <a href="#" onClick={this.handleDelete}>delete</a>
          </div>
        </div>
    )
  }

});

module.exports = Tweet;