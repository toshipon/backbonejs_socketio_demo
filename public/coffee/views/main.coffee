define ['backbone', 'models/user'], (Backbone, UserModel) ->
	class MainView extends Backbone.View 

		el: 'body'
		
		events:
			"click #header .brand": "clickLinkLogo"
			"click #header .navbar-inner .placer": "clickLinkPlacer"
			"click #header .navbar-inner .transrator": "clickLinkTransrator"

		initialize: ->
			App.model = {}
			App.model.user = new UserModel()
			App.socket.on('init', _.bind(@initSocketCommunication, @))

		initSocketCommunication: (param)->
			console.log "views/main.initSocketCommunication"
			App.model.user.set 'userName', param.name
			@$el.find('#header .user_name').text "Your name is #{param.name}"

		clickLinkLogo: ()->
			App.router.navigate '', {trigger: true}
			return false

		clickLinkTransrator: ()->
			App.router.navigate 'transrator', {trigger: true}
			return false

		clickLinkPlacer: ()->
			App.router.navigate 'placer', {trigger: true}
			return false

		showMain: ()->
			@$el.find('#main').hide().removeClass('hide').fadeIn('normal')

		hideMain: ()->
			@$el.find('#main').hide()