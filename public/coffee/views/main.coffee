define ['backbone'], (Backbone) ->
	class MainView extends Backbone.View 

		el: 'body'
		
		events:
			"click #header .brand": "clickLinkLogo"
			"click #header .navbar-inner .placer": "clickLinkPlacer"
			"click #header .navbar-inner .transrator": "clickLinkTransrator"

		clickLinkLogo: ()->
			App.router.navigate '', {trigger: true}

		clickLinkTransrator: ()->
			App.router.navigate 'transrator', {trigger: true}

		clickLinkPlacer: ()->
			App.router.navigate 'placer', {trigger: true}

		showMain: ()->
			@$el.find('#main').hide().removeClass('hide').fadeIn('normal')

		hideMain: ()->
			@$el.find('#main').hide()