define [ 'underscore'
	,'backbone'
	,'collections/placer/requestList'
	,'models/placer/request']
	, (_, Backbone, RequestList, RequestModel) ->
		class PlacerView extends Backbone.View 

			el: '#placer'

			template: '#request_list_li'
			
			events:
				"click #add_request_btn": "clickOpenModel"
				"click #add_request_modal .save_btn": "clickModelSaveBtn"

			initialize: ->
				@modal = @$el.find "#add_request_modal"

			clickOpenModel: ()->
				@modal.modal().find('textarea').val('')

			clickModelSaveBtn: ()->
				text = @modal.find('textarea').val()
				model = new RequestModel(text: text)
				model.set 'requestId', model.cid
				@collection.add(model)
				@render()
				@modal.find('.close').click()

			render: ->
				tmp = $(@template).text()
				@$el.find('#request_list_section').empty().append(_.template(tmp, {requests: @collection.toJSON()}))

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()