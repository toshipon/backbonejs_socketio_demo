var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'views/main', 'views/placer', 'collections/placer/requestList', 'views/translator', 'collections/translator/translationList'], function(Backbone, MainView, PlacerView, RequestList, TranslatorView, TranslationList) {
  var Router;
  return Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'placer': 'initPlacer',
      'translator': 'initTranslator',
      '': 'initMain'
    };

    Router.prototype.initTranslator = function() {
      console.log('routers/router:initTranslator');
      if (this.mainView != null) {
        this.mainView.hideMain();
      }
      if (this.placerView != null) {
        this.placerView.hide();
      }
      if (this.translationList == null) {
        this.translationList = new TranslationList();
      }
      if (this.translationView == null) {
        this.translationView = new TranslatorView({
          collection: this.translationList
        });
      }
      return this.translationView.show();
    };

    Router.prototype.initPlacer = function() {
      console.log('routers/router:initPlacer');
      if (this.mainView != null) {
        this.mainView.hideMain();
      }
      if (this.translationView != null) {
        this.translationView.hide();
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
