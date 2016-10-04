var UserLogin = React.createClass({

  getInitialState: function() {

    return {
      users: [{
          username: "@steveyblam",
          image: "http://statici.behindthevoiceactors.com/behindthevoiceactors/_img/actors/steve-blum-0.67.jpg"
        },
        {
          username: "@bob",
          image:"https://pbs.twimg.com/profile_images/378800000416870688/3c62c5fa578396dc6529700d73d1df87_400x400.jpeg"
        },
        {
          username: "@sparta",
          image:"http://historythings.com/wp-content/uploads/2016/05/sparta.jpeg"
        }
      ],
      current_user : ""
    }

  },

  handleClick : function(e) {

    this.setState({
      current_user: e.target.innerHTML
    });

    this.props.login(this.state.users[e.target.getAttribute('data-id')]);

  },

  render: function() {

    var users = this.state.users.map((function(user, i){
      return (
          <li key={i}><a href="#" data-id={i} onClick={this.handleClick}>{user.username}</a></li>
      )
    }).bind(this));

    return (
      <div className="user_list" >
        <ul>
          { this.state.current_user ? null : users }
        </ul>
      </div>
    )

  }

});

module.exports = UserLogin;