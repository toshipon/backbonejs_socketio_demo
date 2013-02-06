var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var MainView;
  return MainView = (function(_super) {

    __extends(MainView, _super);

    function MainView() {
      return MainView.__super__.constructor.apply(this, arguments);
    }

    MainView.prototype.el = 'body';

    MainView.prototype.events = {
      "click #header .brand": "clickLinkLogo",
      "click #header .navbar-inner .placer": "clickLinkPlacer",
      "click #header .navbar-inner .transrator": "clickLinkTransrator"
    };

    MainView.prototype.clickLinkLogo = function() {
      return App.router.navigate('', {
        trigger: true
      });
    };

    MainView.prototype.clickLinkTransrator = function() {
      return App.router.navigate('transrator', {
        trigger: true
      });
    };

    MainView.prototype.clickLinkPlacer = function() {
      return App.router.navigate('placer', {
        trigger: true
      });
    };

    MainView.prototype.showMain = function() {
      return this.$el.find('#main').hide().removeClass('hide').fadeIn('normal');
    };

    MainView.prototype.hideMain = function() {
      return this.$el.find('#main').hide();
    };

    return MainView;

  })(Backbone.View);
});
