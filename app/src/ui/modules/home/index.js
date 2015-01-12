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
      hello: '\'Allo, \'Allo!',
      items: ['HTML5 Boilerplate', 'Sass', 'Vue.js', '... &amp; more (@see package.json)']
    };
  },

  attached: function() {

    TweenMax.set(this.$el, {opacity: 0});

    // test addClass
    Vue.util.addClass(this.$el, 'm__home--yo');

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
