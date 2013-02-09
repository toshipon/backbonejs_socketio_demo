define ['underscore'
	,'backbone'
	,'collections/translator/translationList'
	,'models/translator/translation'
	,'common/socket']
	, (_, Backbone, TransrationList, TransrationModel, socket) ->
		class TranslatorView extends Backbone.View 

			el: '#translator'

			template: '#transration_list_li'
			
			events:
				"click #header .brand": "clickLinkLogo"

			initialize: ()->
				socket.on 'send:message', _.bind(@receiveMessage, @)

			receiveMessage: (result)->
				console.log "translatorView.receiveMessage"
				console.log "================="
				if result.user != App.model.user.get 'userName'
					@collection.add(new TranslationModel(result))
					@render()

			render: ->
				tmp = @$el.find(@template).text()
				@$el.find('#translation_list_section').empty().append(_.template(tmp, {translations: @collection.toJSON()}))

			clickLinkLogo: ()->
				App.router.navigate '', {trigger: true}

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()

