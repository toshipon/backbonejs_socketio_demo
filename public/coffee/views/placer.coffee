define ['backbone'
	,'collections/placer/requestList']
	, (Backbone, RequestList) ->
		class PlacerView extends Backbone.View 

			el: '#placer'

			template: '#request_list_li'
			
			events:
				"click #header .brand": "clickLinkLogo"

			initialize: ->


			clickLinkLogo: ()->
				Gengo.router.navigate '', {trigger: true}

			show: ()->
				@$el.hide().removeClass('hide').fadeIn('normal')

			hide: ()->
				@$el.hide()