define ['backbone'
	, 'views/main'
	, 'views/placer'
	, 'collections/placer/requestList'
	, 'views/translator'
	, 'collections/translator/translationList']
	, (Backbone, MainView, PlacerView, RequestList, TranslatorView, TranslationList) ->
		class Router extends Backbone.Router
			routes:
				'placer': 'initPlacer'
				'translator': 'initTranslator'
				'': 'initMain'

			initTranslator: ()->
				console.log 'routers/router:initTranslator'
				@mainView.hideMain() if @mainView?
				@placerView.hide() if @placerView?

				@translationList = new TranslationList() unless @translationList?
				@translationView = new TranslatorView(collection: @translationList) unless @translationView?
				@translationView.show()

			initPlacer: ()->
				console.log 'routers/router:initPlacer'
				@mainView.hideMain() if @mainView?
				@translationView.hide() if @translationView?

				@requestList = new RequestList() unless @requestList?
				@placerView = new PlacerView(collection: @requestList) unless @placerView?
				@placerView.show()

			initMain: ()->
				console.log 'routers/router:initMain'
				@transrationView.hide() if @transrationView?
				@placerView.hide() if @placerView?

				@mainView = new MainView() unless @mainView?
				@mainView.showMain()
