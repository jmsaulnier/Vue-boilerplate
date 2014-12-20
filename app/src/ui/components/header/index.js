'use strict';

var Vue = require('vue');

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
