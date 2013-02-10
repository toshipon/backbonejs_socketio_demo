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
				"click #add_request_btn": "openRequestModel"
				"click #add_request_modal .save_btn": "clickModelSaveBtn"

			initialize: ->
				console.log "placerView.initialize"
				@modal = @$el.find "#add_request_modal"
				socket.on 'send:message', _.bind(@receiveMessage, @)

			openRequestModel: ()->
				console.log "placerView.clickOpenModel"
				@modal.modal().find('textarea').val('')
				setTimeout(_.bind(()->
					@modal.find('textarea').focus()
				,@),1000)

			clickModelSaveBtn: ()->
				console.log "placerView.clickModelSaveBtn"
				text = @modal.find('textarea').val()
				model = new RequestModel
					originalText: text
					placer: App.model.user.get('userName')
					status: "wait"
				model.set 'requestId', "#{App.model.user.get('id')}#{model.cid}"
				@collection.add(model)
				@render()
				@modal.modal('hide')
				socket.emit('send:message', model.attributes)

			receiveMessage: (result)->
				console.log "placerView.receiveMessage"
				console.log "================="
				if result.placer == App.model.user.get('userName')
					list = @collection.where(requestId: result.requestId)
					# new
					if list.length > 0
						list[0].set result
					# update
					else
						@collection.add(new RequestModel(result))
					@render()

			render: ->
				tmp = @$el.find(@template).text()
				@$el.find('#request_list_section').empty().append(_.template(tmp, {requests: @collection.toJSON()}))

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()