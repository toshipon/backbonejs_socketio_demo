var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'collections/placer/requestList', 'models/placer/request', 'common/socket'], function(_, Backbone, RequestList, RequestModel, socket) {
  var PlacerView;
  return PlacerView = (function(_super) {

    __extends(PlacerView, _super);

    function PlacerView() {
      return PlacerView.__super__.constructor.apply(this, arguments);
    }

    PlacerView.prototype.el = '#placer';

    PlacerView.prototype.template = '#request_list_li';

    PlacerView.prototype.events = {
      "click #add_request_btn": "openRequestModel",
      "click #add_request_modal .save_btn": "clickModelSaveBtn"
    };

    PlacerView.prototype.initialize = function() {
      console.log("placerView.initialize");
      this.modal = this.$el.find("#add_request_modal");
      return socket.on('send:message', _.bind(this.receiveMessage, this));
    };

    PlacerView.prototype.openRequestModel = function() {
      console.log("placerView.clickOpenModel");
      return this.modal.modal().find('textarea').val('');
    };

    PlacerView.prototype.clickModelSaveBtn = function() {
      var model, text;
      console.log("placerView.clickModelSaveBtn");
      text = this.modal.find('textarea').val();
      model = new RequestModel({
        originalText: text,
        placer: App.model.user.get('userName'),
        status: "wait"
      });
      model.set('requestId', model.cid);
      this.collection.add(model);
      this.render();
      this.modal.find('.close').click();
      return socket.emit('send:message', model.attributes);
    };

    PlacerView.prototype.receiveMessage = function(result) {
      var list;
      console.log("placerView.receiveMessage");
      console.log("=================");
      if (result.placer === App.model.user.get('userName')) {
        list = this.collection.where({
          requestId: result.requestId
        });
        if (list.length > 0) {
          list[0].set(result);
        } else {
          this.collection.add(new RequestModel(result));
        }
        return this.render();
      }
    };

    PlacerView.prototype.render = function() {
      var tmp;
      tmp = this.$el.find(this.template).text();
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
