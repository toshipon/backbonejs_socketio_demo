var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'models/user'], function(Backbone, UserModel) {
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
      "click #header .navbar-inner .translator": "clickLinkTranslator"
    };

    MainView.prototype.initialize = function() {
      App.model = {};
      App.model.user = new UserModel();
      return App.socket.on('init', _.bind(this.initSocketCommunication, this));
    };

    MainView.prototype.initSocketCommunication = function(param) {
      console.log("views/main.initSocketCommunication");
      App.model.user.set('userName', param.name);
      return this.$el.find('#header .user_name').text("Your name is " + param.name);
    };

    MainView.prototype.clickLinkLogo = function() {
      App.router.navigate('', {
        trigger: true
      });
      return false;
    };

    MainView.prototype.clickLinkTranslator = function() {
      App.router.navigate('translator', {
        trigger: true
      });
      return false;
    };

    MainView.prototype.clickLinkPlacer = function() {
      App.router.navigate('placer', {
        trigger: true
      });
      return false;
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
