var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'views/main', 'views/placer', 'collections/placer/requestList', 'views/transrator', 'collections/transrator/transrationList'], function(Backbone, MainView, PlacerView, RequestList, TransratorView, TransrationList) {
  var Router;
  return Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'placer': 'initPlacer',
      'transrator': 'initTransrator',
      '': 'initMain'
    };

    Router.prototype.initTransrator = function() {
      console.log('routers/router:initTransrator');
      if (this.mainView != null) {
        this.mainView.hideMain();
      }
      if (this.placerView != null) {
        this.placerView.hide();
      }
      if (this.transrationList == null) {
        this.transrationList = new TransrationList();
      }
      if (this.transrationView == null) {
        this.transrationView = new TransratorView({
          collection: this.transrationList
        });
      }
      return this.transrationView.show();
    };

    Router.prototype.initPlacer = function() {
      console.log('routers/router:initPlacer');
      if (this.mainView != null) {
        this.mainView.hideMain();
      }
      if (this.transrationView != null) {
        this.transrationView.hide();
      }
      if (this.requestList == null) {
        this.requestList = new RequestList();
      }
      if (this.placerView == null) {
        this.placerView = new PlacerView({
          collection: this.requestList
        });
      }
      return this.placerView.show();
    };

    Router.prototype.initMain = function() {
      console.log('routers/router:initMain');
      if (this.transrationView != null) {
        this.transrationView.hide();
      }
      if (this.placerView != null) {
        this.placerView.hide();
      }
      if (this.mainView == null) {
        this.mainView = new MainView();
      }
      return this.mainView.showMain();
    };

    return Router;

  })(Backbone.Router);
});
