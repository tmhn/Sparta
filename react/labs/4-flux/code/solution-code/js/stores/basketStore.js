var EventEmitter = require('events').EventEmitter;
var merge = require('merge');
var appDispatcher = require('../dispatchers/appDispatcher.js');
var Constants = require('../constants/constants.js');

var _basket = [
  
];

var BasketStore = merge(EventEmitter.prototype , {

  getBasket : function() {
    return _basket
  }

});

module.exports = BasketStore;

appDispatcher.register(handleAction);

function handleAction(payload) {

  if(payload.action == Constants.ADD_TO_BASKET) {
    _basket.push(payload.product);
    BasketStore.emit('update');
  }

  if(payload.action == Constants.REMOVE_FROM_BASKET) {
    _basket.splice(payload.index , 1);
    BasketStore.emit('update');
  }
}