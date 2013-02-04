define ['backbone'], (Backbone) ->
	class MainView extends Backbone.View 

		el: 'body'
		
		events:
			"click #header .brand": "clickLinkLogo"
			"click #header .navbar-inner .placer": "clickLinkPlacer"
			"click #header .navbar-inner .transrator": "clickLinkTransrator"

		clickLinkLogo: ()->
			Gengo.router.navigate '', {trigger: true}

		clickLinkTransrator: ()->
			Gengo.router.navigate 'transrator', {trigger: true}

		clickLinkPlacer: ()->
			Gengo.router.navigate 'placer', {trigger: true}