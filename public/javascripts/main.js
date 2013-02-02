var Gengo;

Gengo = {};

require.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  },
  baseUrl: 'javascripts',
  paths: {
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    text: 'lib/text'
  },
  urlArgs: "bust=" + new Date().getTime()
});

require(['views/main', 'routers/rooter'], function(MainView, Router) {
  console.log("/main start");
  Gengo.router = new Router();
  Backbone.history.start({
    pushState: true
  });
  return new MainView();
});
