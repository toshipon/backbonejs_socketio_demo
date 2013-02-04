define(['underscore', 'socketio'], (_, io)->
	socket = io.connect()
	return {
		on: (eventName, callback)->
			socket.on(eventName, ()->
				args = arguments
				_.bind(callback, @)
			)
		emit: (eventName, data, callback)->
			socket.emit(eventName, data, ()->
				args = arguments
				_.bind(callback, @)
			)
	}
)