var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatchers/appDispatcher.js');

var _count = 5;

var CountStore = merge(EventEmitter.prototype, {

  getCount: function(){
    return _count;
  },

  setCount : function(c) {  
    _count = c;
  }

});

module.exports = CountStore;


AppDispatcher.register(handleAction);

function handleAction(payload) {

  if(payload.action == "CLICKED") {
    _count++;
    CountStore.emit('change');
  }

}