define ['backbone', 'models/placer/request'], (Backbone, Request) ->
	class RequestList extends Backbone.Collection 

		model: Request

		