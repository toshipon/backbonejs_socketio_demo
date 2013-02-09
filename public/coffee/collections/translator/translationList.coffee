define ['backbone', 'models/translator/translation'], (Backbone, Translation) ->
	class TranslationList extends Backbone.Collection 

		model: Translation

		