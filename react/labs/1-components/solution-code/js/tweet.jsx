var Tweet = React.createClass({
  
    getDefaultProps: function() {

        return {
          message: "Default Message",
          author: "Default"
        }

    },

    render: function() {

        return (
            <div className="tweet">
              <div className="profile_pic" style={{backgroundImage: 'url(' + this.props.image + ')'}}></div>
              <div className="message">
                {this.props.message}
              </div>
              <div className="author">
                {this.props.author}
              </div>
            </div>
        )
    }

});

module.exports = Tweet;