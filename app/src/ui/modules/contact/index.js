'use strict';

var Vue = require('vue'),
    _ = require('underscore');

var component = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      msg: 'Contact module!'
    };
  },

  attached: function() {

    console.log('contact ' + _.uniqueId());
  },

  methods: {

    testNavigation: function() {

      Vue.navigate('/');
    }

  }

});

module.exports = component;
