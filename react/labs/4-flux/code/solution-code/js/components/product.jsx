var Constants = require('../constants/constants.js');
var appDispatcher = require('../dispatchers/appDispatcher.js');

var Product = React.createClass({

  handleAdd : function() {

    appDispatcher.dispatch({
      action: Constants.ADD_TO_BASKET,
      product: this.props.product
    });

  },

  handleRemove : function() {

    appDispatcher.dispatch({
      action: Constants.REMOVE_FROM_BASKET,
      index: this.props.index
    });

  },

  render: function() {

    if(this.props.add) {
      var add = (
        <div className="add_buttons">
          <a href="#" onClick={this.handleAdd}>Add to basket</a>
        </div>
      )
    }

    if(this.props.remove) {
      var remove = (
        <div className="remove_buttons">
          <a href="#" onClick={this.handleRemove}>Remove from basket</a>
        </div>
      )
    }

    return (
      <div className="product">
        <div className="product_name">
          {this.props.product.name}
        </div>
        <div className="controls">
          {add}
          {remove}
        </div>
      </div>
    )
  }
});

module.exports = Product;