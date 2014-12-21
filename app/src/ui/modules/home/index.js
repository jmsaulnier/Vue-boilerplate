'use strict';

var Vue = require('vue'),
    TweenMax = require('TweenMax');

var component = Vue.extend({

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

    show: function() {

      TweenMax.to(this.$el, 2, {delay: 1, opacity: 1});
    },

    testNavigation: function() {

      Vue.navigate('/contact');
    }

  }

});

module.exports = component;
