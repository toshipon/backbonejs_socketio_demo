var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'text'], function(Backbone) {
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

    Router.prototype.initPlacer = function() {
      console.log('routers/router:initPlacer');
      $("#main, #transrator").addClass('hide');
      $("#placer").hide().removeClass('hide').fadeIn('normal');
      return require(['text!/placer.html'], function(html) {
        return console.log("loaded place.html");
      });
    };

    Router.prototype.initTransrator = function() {
      console.log('routers/router:initTransrator');
      $("#main, #placer").addClass('hide');
      return $("#transrator").hide().removeClass('hide').fadeIn('normal');
    };

    Router.prototype.initMain = function() {
      console.log('routers/router:initMain');
      $("#placer, #transrator").addClass('hide');
      return $("#main").hide().removeClass('hide').fadeIn('normal');
    };

    return Router;

  })(Backbone.Router);
});
