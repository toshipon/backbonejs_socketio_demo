
define(['underscore', 'socketio'], function(_) {
  console.log("========io.connect() ========");
  App.socket = io.connect();
  return {
    on: function(eventName, callback) {
      console.log("========socket.on " + eventName + " ========");
      return App.socket.on(eventName, function() {
        var args;
        args = arguments;
        return callback.apply(callback, args);
      });
    },
    emit: function(eventName, data, callback) {
      console.log("========socket.emit " + eventName + " ========");
      return App.socket.emit(eventName, data, function() {
        var args;
        args = arguments;
        if (callback != null) {
          return callback.apply(callback, args);
        }
      });
    }
  };
});
