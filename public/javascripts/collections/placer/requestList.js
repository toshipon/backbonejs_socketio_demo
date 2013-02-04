var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['backbone', 'models/placer/request'], function(Backbone, Request) {
  var RequestList;
  return RequestList = (function(_super) {

    __extends(RequestList, _super);

    function RequestList() {
      return RequestList.__super__.constructor.apply(this, arguments);
    }

    RequestList.prototype.model = Request;

    return RequestList;

  })(Backbone.Collection);
});
