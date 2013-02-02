define ['backbone'], (Backbone) ->
	class MainView extends Backbone.View 

		el: 'body'
		
		events:
			"click .navbar-inner .placer": "clickLinkPlacer"
			"click .navbar-inner .transrator": "clickLinkTransrator"

		clickLinkTransrator: ()->
			Gengo.router.navigate 'transrator', {trigger: true}

		clickLinkPlacer: ()->
			Gengo.router.navigate 'placer', {trigger: true}