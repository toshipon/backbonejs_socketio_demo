var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'collections/placer/requestList'], function(Backbone, RequestList) {
  var PlacerView;
  return PlacerView = (function(_super) {

    __extends(PlacerView, _super);

    function PlacerView() {
      return PlacerView.__super__.constructor.apply(this, arguments);
    }

    PlacerView.prototype.el = '#placer';

    PlacerView.prototype.template = '#request_list_li';

    PlacerView.prototype.events = {
      "click #header .brand": "clickLinkLogo"
    };

    PlacerView.prototype.initialize = function() {};

    PlacerView.prototype.clickLinkLogo = function() {
      return Gengo.router.navigate('', {
        trigger: true
      });
    };

    PlacerView.prototype.show = function() {
      return this.$el.hide().removeClass('hide').fadeIn('normal');
    };

    PlacerView.prototype.hide = function() {
      return this.$el.hide();
    };

    return PlacerView;

  })(Backbone.View);
});
