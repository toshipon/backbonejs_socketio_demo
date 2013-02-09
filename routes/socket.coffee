# Keep track of which names are used so that there are no duplicates
userNames = (()->
  names = {}

  claim =  (name)->
    if !name || names[name]
      return false
    else
      names[name] = true
      return true

  # find the lowest unused "guest" name and claim it
  getGuestName =  ()->
    nextUserId = 1

    loop
      name = 'Guest' + nextUserId
      nextUserId += 1
      break unless !claim(name)

    return name

  # serialize claimed names as an array
  get =  ()-> 
    res = []
    for user in names 
      res.push(user)

    return res

  free =  (name)->
    if names[name]
      delete names[name]

  return {
    claim: claim,
    free: free,
    get: get,
    getGuestName: getGuestName
  }
)()

# export  for listening to the socket
module.exports =  (socket)->
  name = userNames.getGuestName()

  # send the new user their name and a list of users
  socket.emit 'init',
    name: name,
    users: userNames.get()

  # notify other clients that a new user has joined
  socket.broadcast.emit 'user:join',
    name: name

  # broadcast a user's message to other users
  socket.on 'send:message',  (data)->
    console.log "=========send:message=============="
    socket.broadcast.emit 'send:message',
      user: name,
      placer: data.placer,
      transrator: data.transrator,
      requestId: data.requestId,
      text: data.message

  # clean up when a user leaves, and broadcast it to other users
  socket.on 'disconnect',  ()->
    socket.broadcast.emit 'user:left', name: name
    userNames.free(name)
