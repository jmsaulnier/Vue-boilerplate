'use strict';

/* PACKAGE */

var Vue       = require('vue');
var TweenMax  = require('TweenMax');

/**
 * UI contact section.
 * @module ui/sections/contact/index
 */

module.exports = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      title: 'Contact section!'
    };
  },

  attached: function() {

    TweenMax.set(this.$el, {opacity: 0, y: -50});

    // test Tween
    this.show();
  },

  methods: {

    /**
     * //
     * @method show
     **/
    show: function() {

      TweenMax.to(this.$el, 2, {opacity: 1});
      TweenMax.to(this.$el, 1, {y: 0});
    },

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
