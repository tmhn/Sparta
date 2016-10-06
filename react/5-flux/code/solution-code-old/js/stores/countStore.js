var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var _count = 0;

// Merge our store with Node's Event Emitter
var CountStore = merge(EventEmitter.prototype, {

  // Returns count
  getCount: function() {
    return _count;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

module.exports = CountStore;