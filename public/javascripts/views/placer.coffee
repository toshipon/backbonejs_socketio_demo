define ['backbone'], (Backbone) ->
	class PlacerView extends Backbone.View 

		el: '#placer'
		
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