var userNames;

userNames = (function() {
  var claim, free, get, getGuestName, names;
  names = {};
  claim = function(name) {
    if (!name || names[name]) {
      return false;
    } else {
      names[name] = true;
      return true;
    }
  };
  getGuestName = function() {
    var name, nextUserId;
    nextUserId = 1;
    while (true) {
      name = 'Guest' + nextUserId;
      nextUserId += 1;
      if (!!claim(name)) {
        break;
      }
    }
    return name;
  };
  get = function() {
    var res, user, _i, _len;
    res = [];
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      user = names[_i];
      res.push(user);
    }
    return res;
  };
  free = function(name) {
    if (names[name]) {
      return delete names[name];
    }
  };
  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  };
})();

module.exports = function(socket) {
  var name;
  name = userNames.getGuestName();
  socket.emit('init', {
    name: name,
    users: userNames.get()
  });
  socket.broadcast.emit('user:join', {
    name: name
  });
  socket.on('send:message', function(data) {
    console.log("=========send:message==============");
    return socket.broadcast.emit('send:message', {
      user: name,
      text: data.message
    });
  });
  return socket.on('disconnect', function() {
    socket.broadcast.emit('user:left', {
      name: name
    });
    return userNames.free(name);
  });
};
