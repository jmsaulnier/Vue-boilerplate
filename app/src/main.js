'use strict';

var domready = require('domready'),
    I18n = require('./utils/I18n');

/**
 * main module.
 * @module main
 */

domready(function () {

  require('6to5ify/node_modules/6to5/polyfill');

  var i18n = new I18n( { lang: window.config.LANG, locales: window.config.LOCALES });
  i18n.completed.addOnce(boot);
  i18n.load();

  /**
   * //
   * @method boot
   **/
  function boot() {

    window.config.LANG = i18n.lang;
    window.config.TRANSLATIONS = i18n.translations;

    console.log(window.config.LANG + ' -- ' +  window.config.TRANSLATIONS);

    setHeadTranslations();

    require('./ui/index');
    I18n = null;
  }

  /**
   * //
   * @method setHeadTranslations
   **/
  function setHeadTranslations() {

  }
});

