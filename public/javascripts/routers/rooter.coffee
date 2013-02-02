define ['backbone'], (Backbone) ->
	class Router extends Backbone.Router
		routes:
			'placer': 'initPlacer'
			'transrator': 'initTransrator'

		initPlacer: ()->
			console.log 'routers/router:initPlacer'

		initTransrator: ()->
			console.log 'routers/router:initTransrator'
