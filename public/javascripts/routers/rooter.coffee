define ['backbone', 'text'], (Backbone) ->
	class Router extends Backbone.Router
		routes:
			'placer': 'initPlacer'
			'transrator': 'initTransrator'
			'': 'initMain'

		initPlacer: ()->
			console.log 'routers/router:initPlacer'
			$("#main, #transrator").addClass 'hide'
			$("#placer").hide().removeClass('hide').fadeIn('normal')
			require(['text!/placer.html'], (html)->
				console.log "loaded place.html"
			)

		initTransrator: ()->
			console.log 'routers/router:initTransrator'
			$("#main, #placer").addClass 'hide'
			$("#transrator").hide().removeClass('hide').fadeIn('normal')

		initMain: ()->
			console.log 'routers/router:initMain'
			$("#placer, #transrator").addClass 'hide'
			$("#main").hide().removeClass('hide').fadeIn('normal')
