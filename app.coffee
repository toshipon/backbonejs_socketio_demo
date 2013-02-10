

# Module dependencies.


express = require 'express'
routes = require './routes'
user = require './routes/user'
socket = require './routes/socket'
http = require 'http'
path = require 'path'

app = express()

app.configure(()->
  app.set('port', if process.env.PORT then process.env.PORT else 3000)
  app.set 'views', "#{__dirname}/views"
  app.set 'view engine', 'jade'
  app.use express.favicon()
  app.use express.logger('dev')
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.cookieParser('your secret here')
  app.use express.session()
  app.use app.router
)

app.configure('development', ()->
  app.use(express.errorHandler())
  app.use(express.static(__dirname + '/public_dist'))
)
app.configure('production', ()->
  app.use(express.static(__dirname + '/public_dist'))
)

app.get '/', routes.index
app.get '/placer', routes.index
app.get '/translator', routes.index
app.get '/partials/:name', routes.partials

server = http.createServer(app).listen(app.get('port'), ()->
  console.log "Express server listening on port " + app.get('port')
)

# start socket.io
socketIO = require 'socket.io'
io = socketIO.listen server

# Heroku config only
if process.env.PORT
  io.configure(()-> 
    io.set("transports", ["xhr-polling"]) 
    io.set("polling duration", 10)
  )
io.sockets.on 'connection', socket

    


