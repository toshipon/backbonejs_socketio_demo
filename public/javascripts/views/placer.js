var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var PlacerView;
  return PlacerView = (function(_super) {

    __extends(PlacerView, _super);

    function PlacerView() {
      return PlacerView.__super__.constructor.apply(this, arguments);
    }

    PlacerView.prototype.el = '#placer';

    PlacerView.prototype.events = {
      "click #header .brand": "clickLinkLogo",
      "click #header .navbar-inner .placer": "clickLinkPlacer",
      "click #header .navbar-inner .transrator": "clickLinkTransrator"
    };

    PlacerView.prototype.clickLinkLogo = function() {
      return Gengo.router.navigate('', {
        trigger: true
      });
    };

    PlacerView.prototype.clickLinkTransrator = function() {
      return Gengo.router.navigate('transrator', {
        trigger: true
      });
    };

    PlacerView.prototype.clickLinkPlacer = function() {
      return Gengo.router.navigate('placer', {
        trigger: true
      });
    };

    return PlacerView;

  })(Backbone.View);
});
