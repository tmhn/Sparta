var BasketStore = require('../stores/basketStore.js');
var Product = require('./product.jsx');

var Basket = React.createClass({

  componentDidMount : function() {

    BasketStore.on('update' , this.handleUpdate);

  },

  getInitialState: function() {

    return {
      basket : BasketStore.getBasket()
    }

  },

  handleUpdate : function() {

    this.setState({
      basket: BasketStore.getBasket()
    })

  },

  render: function() {

    var basketHTML = this.state.basket.map(function(product, index){
      return (
        <Product key={index} index={index} product={product} remove={true}/>
      )
    });

    var total = this.state.basket.reduce(function(total , product){
        return total + product.price
    } , 0);


    return (
      <div className="basket">
        <h1>Basket</h1>
        {basketHTML}
        <div className="total">
        Total price: {total}
        </div>
      </div>
    )
  }

});

module.exports = Basket;