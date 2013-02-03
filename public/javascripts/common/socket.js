
define(['underscore', 'socketio'], function(_, io) {
  var socket;
  socket = io.connect();
  return {
    on: function(eventName, callback) {
      return socket.on(eventName, function() {
        var args;
        args = arguments;
        return _.bind(callback, this);
      });
    },
    emit: function(eventName, data, callback) {
      return socket.emit(eventName, data, function() {
        var args;
        args = arguments;
        return _.bind(callback, this);
      });
    }
  };
});
