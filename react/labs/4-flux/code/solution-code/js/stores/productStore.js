var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var _products = [
  {
    name: "Product 1",
    price: 1.99
  },
  {
    name: "Product 2",
    price: 3.99
  },
  {
    name: "Product 3",
    price: 4.99
  },
];

var ProductStore = merge(EventEmitter.prototype , {

  getProducts : function() {
    return _products
  }

});

module.exports = ProductStore;

