define ['backbone', 'models/transrator/transration'], (Backbone, Transration) ->
	class TransrationList extends Backbone.Collection 

		model: Transration

		