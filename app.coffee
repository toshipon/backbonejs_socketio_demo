

# Module dependencies.


express = require 'express'
routes = require './routes'
user = require './routes/user'
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
  app.use express.static(path.join(__dirname, 'public'))
)

app.configure('development', ()->
  app.use(express.errorHandler())
)

app.get '/', routes.index
app.get '/partials/:name', routes.partials
app.get '*', routes.index

server = http.createServer(app).listen(app.get('port'), ()->
  console.log "Express server listening on port " + app.get('port')
)

# start socket.io

socketIO = require 'socket.io'
io = socketIO.listen server

io.sockets.on 'connection', (socket)->
  console.log 'connection'

  socket.on 'message', (data)->
    console.log 'message'
    io.socket.emit 'message', value: data.value

  socket.on 'disconnect', ()->
    console.log 'disconnect'

    


