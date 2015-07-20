'use strict';

/* PACKAGE */

var Vue         = require('vue');
var route       = require('vue-route');
var resizeMixin = require('vue-resize-mixin');
var loaderMixin = require('./mixins/loader');

var debug = require('debug');

/* PRIVATE */

var _preloader = null;
var _manifest = [];

/**
 * UI index module.
 * @module ui/index
 */

Vue.use(route);

if (window.config.ENV === 'production') {
  // Disable all debug logs in production.
  debug.disable();
  Vue.config.silent = true;
} else {
  // Enable debug log via query string.
  // Example: ?debug=url,route
  //
  // Here `route` is enabled by default.
  require('enable-debug')(['route'], true);

  Vue.config.debug = true;
}

module.exports = new Vue({

  el: '#app',

  mixins: [resizeMixin, loaderMixin],

  events: {
    'resize'        : 'resizeHandler',

    'load:progress' : 'loadProgressHandler',
    'load:complete' : 'loadCompleteHandler',
    'load:error'    : 'loadErrorHandler'
  },

  routes: require('./routes'),

  components: {
    'section-home'    : require('./sections/home'),
    'section-contact' : require('./sections/contact'),

    'component-header': require('./components/header')
  },

  created: function() {

    _preloader = document.getElementById('preloader');

    // If you need to dynamically create the manifest
    _manifest = [
      'images/yeoman.png'
    ];
  },

  ready: function() {

    this.load(_manifest);
  },

  data: {
    isLoaded: false,
    progress: 0
  },

  methods: {

    /**
     * @method loadErrorHandler
     * @param {Object} event
     **/
    loadErrorHandler: function(event) {
        console.log('Error loading assets');
    },

    /**
     * @method loadProgressHandler
     * @param {Object} event
     **/
    loadProgressHandler: function(event) {

      this.$data.progress = event.progress;
    },

    /**
     * @method loadCompleteHandler
     * @param {Object} event
     **/
    loadCompleteHandler: function(event) {

      this.$data.progress = 1;
      this.$data.isLoaded = true;

      _preloader.remove();
    },

    /**
     * @method resizeHandler
     * @param {Object} event
     **/
    resizeHandler: function(event) {

      //var width = event.width;
      //var height = event.height;
    }
  }

});
