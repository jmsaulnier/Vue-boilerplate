'use strict';

var Vue = require('vue');

/**
 * UI header component.
 * @module ui/components/header/index
 */

var component = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      title: 'Header!'
    };
  },

  attached: function() {


  },

  methods: {


  }

});

module.exports = component;
