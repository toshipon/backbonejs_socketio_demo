define(['underscore', 'socketio'], (_)->
	console.log "========io.connect() ========"
	App.socket = io.connect()
	return {
		on: (eventName, callback)->
			console.log "========socket.on #{eventName} ========"
			App.socket.on(eventName, ()->
				args = arguments
				_.bind(callback, @)
			)
		emit: (eventName, data, callback)->
			console.log "========socket.emit #{eventName} ========"
			App.socket.emit(eventName, data, ()->
				args = arguments
				_.bind(callback, @)
			)
	}
)