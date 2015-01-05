'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax');

/**
 * UI home module.
 * @module ui/modules/home/index
 */

module.exports = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      msg: 'Home module!'
    };
  },

  attached: function() {

    TweenMax.set(this.$el, {opacity: 0});

    // test addClass
    Vue.util.addClass(this.$el, 'c__home--yo');

    // test Tween
    this.show();
  },

  methods: {

    /**
     * //
     * @method show
     **/
    show: function() {

      TweenMax.to(this.$el, 2, {delay: 1, opacity: 1});
    },

    /**
     * //
     * @method testNavigation
     **/
    testNavigation: function() {

      Vue.navigate('/contact');
    }

  }

});
