var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone'], function(Backbone) {
  var TransrationModel;
  return TransrationModel = (function(_super) {

    __extends(TransrationModel, _super);

    function TransrationModel() {
      return TransrationModel.__super__.constructor.apply(this, arguments);
    }

    return TransrationModel;

  })(Backbone.Model);
});
