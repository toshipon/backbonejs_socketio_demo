var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'collections/placer/requestList', 'models/placer/request'], function(_, Backbone, RequestList, RequestModel) {
  var PlacerView;
  return PlacerView = (function(_super) {

    __extends(PlacerView, _super);

    function PlacerView() {
      return PlacerView.__super__.constructor.apply(this, arguments);
    }

    PlacerView.prototype.el = '#placer';

    PlacerView.prototype.template = '#request_list_li';

    PlacerView.prototype.events = {
      "click #add_request_btn": "clickOpenModel",
      "click #add_request_modal .save_btn": "clickModelSaveBtn"
    };

    PlacerView.prototype.initialize = function() {
      return this.modal = this.$el.find("#add_request_modal");
    };

    PlacerView.prototype.clickOpenModel = function() {
      return this.modal.modal().find('textarea').val('');
    };

    PlacerView.prototype.clickModelSaveBtn = function() {
      var model, text;
      text = this.modal.find('textarea').val();
      model = new RequestModel({
        text: text
      });
      model.set('requestId', model.cid);
      this.collection.add(model);
      this.render();
      return this.modal.find('.close').click();
    };

    PlacerView.prototype.render = function() {
      var tmp;
      tmp = $(this.template).text();
      return this.$el.find('#request_list_section').empty().append(_.template(tmp, {
        requests: this.collection.toJSON()
      }));
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
