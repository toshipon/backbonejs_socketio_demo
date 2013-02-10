var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['underscore', 'backbone', 'collections/translator/translationList', 'models/translator/translation', 'common/socket'], function(_, Backbone, TranslationList, TranslationModel, socket) {
  var TranslatorView;
  return TranslatorView = (function(_super) {

    __extends(TranslatorView, _super);

    function TranslatorView() {
      return TranslatorView.__super__.constructor.apply(this, arguments);
    }

    TranslatorView.prototype.el = '#translator';

    TranslatorView.prototype.template = '#translation_list_li';

    TranslatorView.prototype.events = {
      "click .translate_btn": "openTranslationModal",
      "click #translation_modal .save_btn": "clickModelSaveBtn",
      "click #translation_modal .close_btn": "clickModelCloseBtn",
      "keydown #translation_modal textarea": "updateTranslateStatus"
    };

    TranslatorView.prototype.initialize = function() {
      socket.on('send:message', _.bind(this.receiveMessage, this));
      return this.modal = this.$el.find("#translation_modal");
    };

    TranslatorView.prototype.receiveMessage = function(result) {
      var list;
      console.log("translatorView.receiveMessage");
      console.log("=================");
      if (result.placer !== App.model.user.get('userName')) {
        list = this.collection.where({
          requestId: result.requestId
        });
        if (list.length > 0) {
          list[0].set(result);
        } else {
          this.collection.add(new TranslationModel(result));
        }
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

    TranslatorView.prototype.openTranslationModal = function(e) {
      var $tr;
      $tr = $(e.target).parents('.translation_tr');
      this.modalTargetModel = this.collection.where({
        requestId: $tr.data('id')
      })[0];
      if (this.modalTargetModel != null) {
        this.modal.find('textarea').val(this.modalTargetModel.get('translation'));
        this.modal.modal().find('.original_text').text(this.modalTargetModel.get('originalText'));
        this.modalTargetModel.set({
          translator: App.model.user.get('userName'),
          status: "acceptance"
        });
        socket.emit('send:message', this.modalTargetModel.attributes);
        return setTimeout(_.bind(function() {
          return this.modal.find('textarea').focus();
        }, this), 1000);
      }
    };

    TranslatorView.prototype.clickModelSaveBtn = function() {
      var translationText;
      console.log("placerView.clickModelSaveBtn");
      translationText = this.modal.find('textarea').val();
      this.modalTargetModel.set({
        translationText: translationText,
        status: "translated",
        translator: App.model.user.get('userName')
      });
      this.render();
      this.modal.modal('hide');
      return socket.emit('send:message', this.modalTargetModel.attributes);
    };

    TranslatorView.prototype.clickModelCloseBtn = function() {
      console.log("placerView.clickModelCloseBtn");
      this.modalTargetModel.set({
        translationText: "",
        status: "wait",
        translator: ""
      });
      this.render();
      return socket.emit('send:message', this.modalTargetModel.attributes);
    };

    TranslatorView.prototype.updateTranslateStatus = function() {
      if (this.timer != null) {
        return;
      }
      return this.timer = setTimeout(_.bind(function() {
        var translationText;
        translationText = this.modal.find('textarea').val();
        this.statusCount = (this.statusCount != null) || this.statusCount === 1 ? 0 : 1;
        this.modalTargetModel.set({
          translationText: translationText,
          status: this.statusCount === 0 ? "editing.." : "editing...",
          translator: App.model.user.get('userName')
        });
        socket.emit('send:message', this.modalTargetModel.attributes);
        return this.timer = null;
      }, this), 1000);
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
