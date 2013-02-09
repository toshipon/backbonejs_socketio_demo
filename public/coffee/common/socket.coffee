define(['underscore', 'socketio'], (_)->
	console.log "========io.connect() ========"
	App.socket = io.connect()
	return {
		on: (eventName, callback)->
			console.log "========socket.on #{eventName} ========"
			App.socket.on(eventName, ()->
				args = arguments
				callback.apply(callback, args)
			)
		emit: (eventName, data, callback)->
			console.log "========socket.emit #{eventName} ========"
			App.socket.emit(eventName, data, ()->
				args = arguments
				callback.apply(callback, args) if callback?
			)
	}
)