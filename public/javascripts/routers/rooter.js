var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var Router;
  return Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.routes = {
      'placer': 'initPlacer',
      'transrator': 'initTransrator'
    };

    Router.prototype.initPlacer = function() {
      return console.log('routers/router:initPlacer');
    };

    Router.prototype.initTransrator = function() {
      return console.log('routers/router:initTransrator');
    };

    return Router;

  })(Backbone.Router);
});
