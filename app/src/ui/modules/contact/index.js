'use strict';

var Vue = require('vue');

/**
 * UI contact module.
 * @module ui/modules/contact/index
 */

module.exports = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      msg: 'Contact module!'
    };
  },

  attached: function() {

    console.log('contact');
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
