App = {} unless App?

require.config
	shim: {
		'underscore': {
			exports: '_'
		},
		'backbone': {
			deps: [
				'underscore'
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	baseUrl: 'javascripts'
	paths: {
		underscore: 'lib/underscore'
		backbone: 'lib/backbone'
		text: 'lib/text'
		socketio: 'lib/socket.io.min'
		jade: 'lib/jade.min'
		bootstrap: 'lib/bootstrap'
	},
	urlArgs: "bust=" + new Date().getTime()

require [
	'views/main'
	'routers/rooter'
	'bootstrap'
], (MainView, Router) ->

	console.log("/main start")
	App.router = new Router()
	
	Backbone.history.start({pushState:true})
	new MainView()
	