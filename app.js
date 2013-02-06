var app, express, http, io, path, routes, server, socket, socketIO, user;

express = require('express');

routes = require('./routes');

user = require('./routes/user');

socket = require('./routes/socket');

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

app.get('/placer', routes.index);

app.get('/transrator', routes.index);

app.get('/partials/:name', routes.partials);

server = http.createServer(app).listen(app.get('port'), function() {
  return console.log("Express server listening on port " + app.get('port'));
});

socketIO = require('socket.io');

io = socketIO.listen(server);

io.sockets.on('connection', socket);
