'use strict';

/* PACKAGE */

var Vue = require('vue');

/**
 * UI header component.
 * @module ui/components/header/index
 */

module.exports = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

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
