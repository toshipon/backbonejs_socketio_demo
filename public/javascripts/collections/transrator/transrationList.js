var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'models/transrator/transration'], function(Backbone, Transration) {
  var TransrationList;
  return TransrationList = (function(_super) {

    __extends(TransrationList, _super);

    function TransrationList() {
      return TransrationList.__super__.constructor.apply(this, arguments);
    }

    TransrationList.prototype.model = Transration;

    return TransrationList;

  })(Backbone.Collection);
});
