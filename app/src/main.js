'use strict';

var domready = require('domready');
var i18n     = require('./utils/i18n');

/**
 * main module.
 * @module main
 */

domready(function () {

  require('./ui/index');
  i18n = null;

});

