define ['backbone'
	, 'views/main'
	, 'views/placer'
	, 'collections/placer/requestList'
	, 'views/transrator'
	, 'collections/transrator/transrationList']
	, (Backbone, MainView, PlacerView, RequestList, TransratorView, TransrationList) ->
		class Router extends Backbone.Router
			routes:
				'placer': 'initPlacer'
				'transrator': 'initTransrator'
				'': 'initMain'

			initTransrator: ()->
				console.log 'routers/router:initTransrator'
				@mainView.hideMain() if @mainView?
				@placerView.hide() if @placerView?

				@transrationList = new TransrationList() unless @transrationList?
				@transrationView = new TransratorView(collection: @transrationList) unless @transrationView?
				@transrationView.show()

			initPlacer: ()->
				console.log 'routers/router:initPlacer'
				@mainView.hideMain() if @mainView?
				@transrationView.hide() if @transrationView?

				@requestList = new RequestList() unless @requestList?
				@placerView = new PlacerView(collection: @requestList) unless @placerView?
				@placerView.show()

			initMain: ()->
				console.log 'routers/router:initMain'
				@transrationView.hide() if @transrationView?
				@placerView.hide() if @placerView?

				@mainView = new MainView() unless @mainView?
				@mainView.showMain()
