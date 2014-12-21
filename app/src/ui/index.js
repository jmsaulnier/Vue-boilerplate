'use strict';

var Vue = require('vue'),
    route = require('vue-route'),
    resizeMixin = require('vue-resize-mixin'),
    createjs = require('CreateJS');

Vue.use(route);

var app = new Vue({

  el: '#app',

  mixins: [resizeMixin],

  events: {
    'resize': 'resizeHandler'
  },

  routes: require('./routes'),

  components: {
    mHome: require('./modules/home'),
    mContact: require('./modules/contact'),

    cHeader: require('./components/header')
  },

  manifest: [
    { id: 'logo', src: 'images/logo.png' }
  ],

  created: function() {
    // If you need to dynamically create the manifest
    this.$options.manifest = [
      // ...
    ];
  },

  ready: function() {

    this.startPreloader();
  },

  data: {
    progress: 0,
    preloader: null
  },

  methods: {

    startPreloader: function() {

      var manifest = this.$options.manifest;

      this.preloader = new createjs.LoadQueue();

      this.preloader.on('error', this.loadErrorHandler);
      this.preloader.on('progress', this.loadProgressHandler);
      this.preloader.on('complete', this.loadCompleteHandler);
      this.preloader.loadManifest(manifest);

    },

    loadErrorHandler: function(event) {


    },

    loadProgressHandler: function(event) {

      this.progress = event.progress;
    },

    loadCompleteHandler: function(event) {

      this.progress = 1;

      if(this.preloader) {
        this.preloader.setPaused(true);
        this.preloader.off();
        this.preloader.removeAll();
        this.preloader.close();
        this.preloader = null;
      }
    },

    resizeHandler: function(event) {

      var width = event.width;
      var height = event.height;

      console.log('width' + width + 'height ' + height);
    }
  }

});

module.exports = app;
