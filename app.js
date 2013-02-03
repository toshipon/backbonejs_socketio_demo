var app, express, http, io, path, routes, server, socketIO, user;

express = require('express');

routes = require('./routes');

user = require('./routes/user');

http = require('http');

path = require('path');

app = express();

app.configure(function() {
  app.set('port', process.env.PORT ? process.env.PORT : 3000);
  app.set('views', "" + __dirname + "/views");
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  return app.use(express["static"](path.join(__dirname, 'public')));
});

app.configure('development', function() {
  return app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/partials/:name', routes.partials);

app.get('*', routes.index);

server = http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

socketIO = require('socket.io');

io = socketIO.listen(server);

io.sockets.on('connection', function(socket) {
  console.log('connection');
  socket.on('message', function(data) {
    console.log('message');
    return io.socket.emit('message', {
      value: data.value
    });
  });
  return socket.on('disconnect', function() {
    return console.log('disconnect');
  });
});
