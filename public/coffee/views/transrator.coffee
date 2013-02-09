define ['underscore'
	,'backbone'
	,'collections/transrator/transrationList'
	,'models/transrator/transration'
	,'common/socket']
	, (_, Backbone, TransrationList, TransrationModel, socket) ->
		class TransratorView extends Backbone.View 

			el: '#transrator'

			template: '#transration_list_li'
			
			events:
				"click #header .brand": "clickLinkLogo"

			initialize: ()->
				socket.on 'send:message', _.bind(@receiveMessage, @)

			receiveMessage: (result)->
				console.log "transratorView.receiveMessage"
				console.log "================="
				if result.user != App.model.user.get 'userName'
					@collection.add(new TransrationModel(result))
					@render()

			render: ->
				tmp = $(@template).text()
				@$el.find('#transration_list_section').empty().append(_.template(tmp, {transrations: @collection.toJSON()}))

			clickLinkLogo: ()->
				App.router.navigate '', {trigger: true}

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()

