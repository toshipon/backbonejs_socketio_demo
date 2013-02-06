define ['backbone'], (Backbone) ->
	class TransratorView extends Backbone.View 

		el: '#transrator'
		
		events:
			"click #header .brand": "clickLinkLogo"

		clickLinkLogo: ()->
			App.router.navigate '', {trigger: true}

		show: ()->
			@$el.hide().removeClass('hide').fadeIn('normal')

		hide: ()->
			@$el.hide()

