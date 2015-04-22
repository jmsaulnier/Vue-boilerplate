'use strict';

var domready = require('domready');
var i18n     = require('./utils/i18n');

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
    window.config.TRANSLATIONS = JSON.parse(i18n.translations);

    console.log(window.config.LANG + ' -- ' +  window.config.TRANSLATIONS);

    setMetaDescription();

    require('./ui/index');
    i18n = null;
  }

  /**
   * //
   * @method setMetaDescription
   **/
  function setMetaDescription() {

    document.title = window.config.TRANSLATIONS.meta.title;
    document.description = window.config.TRANSLATIONS.meta.description;

  }
});

