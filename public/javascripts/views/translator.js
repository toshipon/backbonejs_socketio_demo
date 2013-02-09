var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'collections/translator/translationList', 'models/translator/translation', 'common/socket'], function(_, Backbone, TransrationList, TransrationModel, socket) {
  var TranslatorView;
  return TranslatorView = (function(_super) {

    __extends(TranslatorView, _super);

    function TranslatorView() {
      return TranslatorView.__super__.constructor.apply(this, arguments);
    }

    TranslatorView.prototype.el = '#translator';

    TranslatorView.prototype.template = '#transration_list_li';

    TranslatorView.prototype.events = {
      "click #header .brand": "clickLinkLogo"
    };

    TranslatorView.prototype.initialize = function() {
      return socket.on('send:message', _.bind(this.receiveMessage, this));
    };

    TranslatorView.prototype.receiveMessage = function(result) {
      console.log("translatorView.receiveMessage");
      console.log("=================");
      if (result.user !== App.model.user.get('userName')) {
        this.collection.add(new TranslationModel(result));
        return this.render();
      }
    };

    TranslatorView.prototype.render = function() {
      var tmp;
      tmp = this.$el.find(this.template).text();
      return this.$el.find('#translation_list_section').empty().append(_.template(tmp, {
        translations: this.collection.toJSON()
      }));
    };

    TranslatorView.prototype.clickLinkLogo = function() {
      return App.router.navigate('', {
        trigger: true
      });
    };

    TranslatorView.prototype.show = function() {
      return this.$el.hide().removeClass('hide').fadeIn('normal');
    };

    TranslatorView.prototype.hide = function() {
      return this.$el.hide();
    };

    return TranslatorView;

  })(Backbone.View);
});
