'use strict';

/* PACKAGE */

var Vue       = require('vue');
var TweenMax  = require('TweenMax');

/**
 * UI home section.
 * @module ui/sections/home/index
 */

module.exports = Vue.extend({

  template: require('./view.tpl'),
  replace: true,

  data: function () {
    return {
      hello: '\'Allo!',
      items: [  'HTML5 Boilerplate',
                'Sass',
                'Vue.js',
                '... &amp; more'
      ]
    };
  },

  attached: function() {

    TweenMax.set(this.$el, {opacity: 0});

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
    }
  }
});
