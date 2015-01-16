'use strict';

var domready = require('domready'),
    i18n = require('./utils/i18n');

/**
 * main module.
 * @module main
 */

domready(function () {

  i18n.loaded.addOnce(boot);
  i18n.load({ lang: window.config.LANG, locales: window.config.LOCALES });

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
    i18n = null;
  }

  /**
   * //
   * @method setHeadTranslations
   **/
  function setHeadTranslations() {

  }
});

