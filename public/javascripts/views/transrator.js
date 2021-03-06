var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'collections/transrator/transrationList', 'models/transrator/transration', 'common/socket'], function(_, Backbone, TransrationList, TransrationModel, socket) {
  var TransratorView;
  return TransratorView = (function(_super) {

    __extends(TransratorView, _super);

    function TransratorView() {
      return TransratorView.__super__.constructor.apply(this, arguments);
    }

    TransratorView.prototype.el = '#transrator';

    TransratorView.prototype.template = '#transration_list_li';

    TransratorView.prototype.events = {
      "click #header .brand": "clickLinkLogo"
    };

    TransratorView.prototype.initialize = function() {
      return socket.on('send:message', _.bind(this.receiveMessage, this));
    };

    TransratorView.prototype.receiveMessage = function(result) {
      console.log("transratorView.receiveMessage");
      console.log("=================");
      if (result.user !== App.model.user.get('userName')) {
        this.collection.add(new TransrationModel(result));
        return this.render();
      }
    };

    TransratorView.prototype.render = function() {
      var tmp;
      tmp = this.$el.find(this.template).text();
      return this.$el.find('#transration_list_section').empty().append(_.template(tmp, {
        transrations: this.collection.toJSON()
      }));
    };

    TransratorView.prototype.clickLinkLogo = function() {
      return App.router.navigate('', {
        trigger: true
      });
    };

    TransratorView.prototype.show = function() {
      return this.$el.hide().removeClass('hide').fadeIn('normal');
    };

    TransratorView.prototype.hide = function() {
      return this.$el.hide();
    };

    return TransratorView;

  })(Backbone.View);
});
