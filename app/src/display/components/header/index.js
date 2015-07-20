'use strict';

/* PACKAGE */

var Vue = require('vue');

/**
 * UI header component.
 * @module ui/components/header/index
 */

var Header = Vue.extend({

  template: require('./view.tpl'),

  data: function () {
    return {
      title: '♡'
    };
  },

  attached: function() {


  },

  methods: {


  }

});

Vue.component('component-header', Header);

module.exports = Header;
