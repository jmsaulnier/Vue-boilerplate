'use strict';

var domready = require('domready'),
    I18n = require('./utils/I18n');

domready(function () {

  var i18n = new I18n( { lang: window.config.LANG, locales: window.config.LOCALES });
  i18n.completed.addOnce(boot);
  i18n.load();

  /**
   * @method boot
   * @return
   **/
  function boot() {

    window.config.LANG = i18n.getLang();
    window.config.TRANSLATIONS = i18n.getTranslations();

    alert( window.config.LANG );

    setHeadTranslations();

    require('./ui/index');
    I18n = null;
  }

  /**
   * @method setHeadTranslations
   * @return
   **/
  function setHeadTranslations() {

  }
});

