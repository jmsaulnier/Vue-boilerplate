'use strict';

var Vue = require('vue'),
    _ = require('underscore');

/**
 * UI contact module.
 * @module ui/modules/contact/index
 */

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

    /**
     *
     * //
     *
     * @method testNavigation
     **/
    testNavigation: function() {

      Vue.navigate('/');
    }

  }

});

module.exports = component;
