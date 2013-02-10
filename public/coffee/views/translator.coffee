define ['underscore'
	,'backbone'
	,'collections/translator/translationList'
	,'models/translator/translation'
	,'common/socket']
	, (_, Backbone, TranslationList, TranslationModel, socket) ->
		class TranslatorView extends Backbone.View 

			el: '#translator'

			template: '#translation_list_li'
			
			events:
				"click .translate_btn": "openTranslationModal"
				"click #translation_modal .save_btn": "clickModelSaveBtn"
				"click #translation_modal .close_btn": "clickModelCloseBtn"
				"keydown #translation_modal textarea": "updateTranslateStatus"

			initialize: ()->
				socket.on 'send:message', _.bind(@receiveMessage, @)
				@modal = @$el.find "#translation_modal"

			receiveMessage: (result)->
				console.log "translatorView.receiveMessage"
				console.log "================="
				if result.placer != App.model.user.get 'userName'
					list = @collection.where(requestId: result.requestId)
					# new
					if list.length > 0
						list[0].set result
					# update
					else
						@collection.add(new TranslationModel(result))
					@render()

			render: ->
				tmp = @$el.find(@template).text()
				@$el.find('#translation_list_section').empty().append(_.template(tmp, {translations: @collection.toJSON()}))

			openTranslationModal: (e)->
				$tr = $(e.target).parents('.translation_tr')
				@modalTargetModel = @collection.where(requestId:$tr.data('id'))[0]
				if @modalTargetModel?
					@modal.find('textarea').val(@modalTargetModel.get('translation'))
					@modal.modal().find('.original_text').text @modalTargetModel.get('originalText')
					@modalTargetModel.set
						translator: App.model.user.get('userName')
						status: "acceptance"
					socket.emit('send:message', @modalTargetModel.attributes)
					setTimeout(_.bind(()->
						@modal.find('textarea').focus()
					,@),1000)

			clickModelSaveBtn: ()->
				console.log "placerView.clickModelSaveBtn"
				translationText = @modal.find('textarea').val()
				@modalTargetModel.set
					translationText: translationText
					status: "translated"
					translator: App.model.user.get('userName')
				@render()
				@modal.modal('hide')
				socket.emit('send:message', @modalTargetModel.attributes)

			clickModelCloseBtn: ()->
				console.log "placerView.clickModelCloseBtn"
				@modalTargetModel.set
					translationText: ""
					status: "wait"
					translator: ""
				@render()
				socket.emit('send:message', @modalTargetModel.attributes)

			# realtime status update
			updateTranslateStatus: ()->
				translationText = @modal.find('textarea').val()
				@statusCount = if @statusCount? or @statusCount==1 then 0 else 1
				@modalTargetModel.set
					translationText: translationText
					status: if @statusCount == 0 then "editing.."  else "editing..."  
					translator: App.model.user.get('userName')
				socket.emit('send:message', @modalTargetModel.attributes)

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()

