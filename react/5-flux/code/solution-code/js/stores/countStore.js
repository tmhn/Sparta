var appDispatcher = require('../dispatchers/appDispatcher.js');
var appConstants = require('../constants/appConstants.js');
var EventEmitter = require('events').EventEmitter;
var merge = require('merge');

var _count = 0;

var CountStore =  merge(EventEmitter.prototype , {

  getCount: function() {
    return _count;
  }

});


function handleAction(payload) {


   if(payload.action == appConstants.CLICKED) {

       _count++;

       CountStore.emit('update');
      
   }

}

appDispatcher.register(handleAction);

module.exports = CountStore;

