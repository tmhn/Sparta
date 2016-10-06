var ProductStore = require('../stores/productStore.js');
var Product = require('./product.jsx');

var ProductList = React.createClass({

  componentDidMount : function() {

    ProductStore.on('update' , this.handleUpdate);

  },

  getInitialState: function() {

    return {
      products : ProductStore.getProducts()
    }

  },

  handleUpdate : function() {

    this.setState({
      products: ProductStore.getProducts()
    })

  },

  render: function() {

    var productsHTML = this.state.products.map(function(product, index){
      return (
        <Product key={index} product={product} add={true}/>
      )
    });

    return (
      <div className="products_list">
        <h1>Products</h1>
        <ul>
          {productsHTML}
        </ul>
      </div>
    )
  }
});

module.exports = ProductList;