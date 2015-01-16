'use strict';

var Vue = require('vue'),
    route = require('vue-route'),
    resizeMixin = require('vue-resize-mixin');


/**
 * UI index module.
 * @module ui/index
 */

Vue.use(route);

module.exports = new Vue({

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
