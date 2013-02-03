var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var TransratorView;
  return TransratorView = (function(_super) {

    __extends(TransratorView, _super);

    function TransratorView() {
      return TransratorView.__super__.constructor.apply(this, arguments);
    }

    TransratorView.prototype.el = '#transrator';

    TransratorView.prototype.events = {
      "click #header .brand": "clickLinkLogo",
      "click #header .navbar-inner .placer": "clickLinkPlacer",
      "click #header .navbar-inner .transrator": "clickLinkTransrator"
    };

    TransratorView.prototype.clickLinkLogo = function() {
      return Gengo.router.navigate('', {
        trigger: true
      });
    };

    TransratorView.prototype.clickLinkTransrator = function() {
      return Gengo.router.navigate('transrator', {
        trigger: true
      });
    };

    TransratorView.prototype.clickLinkPlacer = function() {
      return Gengo.router.navigate('placer', {
        trigger: true
      });
    };

    return TransratorView;

  })(Backbone.View);
});
