var __hasProp={}.hasOwnProperty,__extends=function(e,t){function r(){this.constructor=e}for(var n in t)__hasProp.call(t,n)&&(e[n]=t[n]);return r.prototype=t.prototype,e.prototype=new r,e.__super__=t.prototype,e};define(["backbone","views/main","views/placer","collections/placer/requestList","views/translator","collections/translator/translationList"],function(e,t,n,r,i,s){var o;return o=function(e){function o(){return o.__super__.constructor.apply(this,arguments)}return __extends(o,e),o.prototype.routes={placer:"initPlacer",translator:"initTranslator","":"initMain"},o.prototype.initTranslator=function(){return console.log("routers/router:initTranslator"),this.mainView!=null&&this.mainView.hideMain(),this.placerView!=null&&this.placerView.hide(),this.translationList==null&&(this.translationList=new s),this.translationView==null&&(this.translationView=new i({collection:this.translationList})),this.translationView.show()},o.prototype.initPlacer=function(){return console.log("routers/router:initPlacer"),this.mainView!=null&&this.mainView.hideMain(),this.translationView!=null&&this.translationView.hide(),this.requestList==null&&(this.requestList=new r),this.placerView==null&&(this.placerView=new n({collection:this.requestList})),this.placerView.show()},o.prototype.initMain=function(){return console.log("routers/router:initMain"),this.translationView!=null&&this.translationView.hide(),this.placerView!=null&&this.placerView.hide(),this.mainView==null&&(this.mainView=new t),this.mainView.showMain()},o}(e.Router)})