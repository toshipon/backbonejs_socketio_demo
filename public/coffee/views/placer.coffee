define [ 'underscore'
	,'backbone'
	,'collections/placer/requestList'
	,'models/placer/request'
	,'common/socket']
	, (_, Backbone, RequestList, RequestModel, socket) ->
		class PlacerView extends Backbone.View 

			el: '#placer'

			template: '#request_list_li'
			
			events:
				"click #add_request_btn": "clickOpenModel"
				"click #add_request_modal .save_btn": "clickModelSaveBtn"

			initialize: ->
				console.log "placerView.initialize"
				@modal = @$el.find "#add_request_modal"
				socket.on 'send:message', _.bind(@receiveMessage, @)

			clickOpenModel: ()->
				console.log "placerView.clickOpenModel"
				@modal.modal().find('textarea').val('')

			clickModelSaveBtn: ()->
				console.log "placerView.clickModelSaveBtn"
				text = @modal.find('textarea').val()
				model = new RequestModel(text: text, placer: App.model.user.get('userName'))
				model.set 'requestId', model.cid
				@collection.add(model)
				@render()
				@modal.find('.close').click()

				socket.emit('send:message', {
			      message: text
			      requestId: model.cid
			      placer: model.get 'placer'
			    })

			receiveMessage: (result)->
				console.log "placerView.receiveMessage"
				console.log "================="
				if result.user == App.model.user.get('userName')
					@collection.add(new RequestModel(result))
					@render()

			render: ->
				tmp = @$el.find(@template).text()
				@$el.find('#request_list_section').empty().append(_.template(tmp, {requests: @collection.toJSON()}))

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()