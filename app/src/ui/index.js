'use strict';

var Vue         = require('vue');
var route       = require('vue-route');
var resizeMixin = require('vue-resize-mixin');

var debug = require('debug');

/**
 * UI index module.
 * @module ui/index
 */

Vue.use(route);
Vue.config.prefix = 'data-v-';

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

  mixins: [resizeMixin],

  events: {
    'resize': 'resizeHandler'
  },

  routes: require('./routes'),

  components: {
    'section-home' : require('./sections/home'),
    'section-contact': require('./sections/contact'),

    'component-header': require('./components/header')
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
    progress: 0
  },

  methods: {

    /**
     * @method startPreloader
     **/
    startPreloader: function() {

      //var manifest = this.$options.manifest;

    },

    /**
     * @method loadErrorHandler
     * @param {Object} event
     **/
    loadErrorHandler: function(event) {


    },

    /**
     * @method loadProgressHandler
     * @param {Object} event
     **/
    loadProgressHandler: function(event) {

      this.progress = event.progress;
    },

    /**
     * @method loadCompleteHandler
     * @param {Object} event
     **/
    loadCompleteHandler: function(event) {

      this.progress = 1;

    },

    /**
     * @method resizeHandler
     * @param {Object} event
     **/
    resizeHandler: function(event) {

      var width = event.width;
      var height = event.height;

      console.log('width' + width + 'height ' + height);
    }
  }

});
