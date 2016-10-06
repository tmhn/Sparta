var ProductList = require('./components/productList.jsx');
var Basket = require('./components/basket.jsx');

ReactDOM.render(
  <ProductList/>,
  document.getElementById('product_list')
);

ReactDOM.render(
  <Basket/>,
  document.getElementById('basket')
)