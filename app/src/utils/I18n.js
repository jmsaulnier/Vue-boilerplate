'use strict';

var Signal = require('signals'),
    request = require('superagent'),
    queryString = require('query-string'),
    _ = require('underscore');

/**
 *
 **/
function I18n(options) {

  var _defaults = {
    lang: 'en',
    locales: ['en'],
    directory: '/locales/',
    prefix: '-',
    ext: '.json'
  };

  _.extend(_defaults, options);

  var _lang = '';
  var _translations = null;


  var p = I18n.prototype;

  p.completed = new Signal();

  /**
   * @method load
   * @return
   **/
  p.load = function() {

    _lang = this.getLangUrlParams() ? this.getLangUrlParams() : this.getLangBrowser();

    request
      .get(_defaults.directory + _lang + _defaults.ext)
      .end(function(response){

        if(response.ok) {

          _translations = response.text;
          this.completed.dispatch();

        } else {
          console.warn('Unable to load i18n file :: ' + _lang);
        }

      }.bind(this));

  };

  /**
   * @method getLangBrowser
   * @return
   **/
  p.getLangBrowser = function() {

    var lang;

    if (navigator.languages) {
      // chrome does not currently set navigator.language correctly https://code.google.com/p/chromium/issues/detail?id=101138
      // but it does set the first element of navigator.languages correctly
      lang = navigator.languages[0];
    } else if (navigator.userLanguage) {
      // IE only
      lang = navigator.userLanguage;
    } else {
      // as of this writing the latest version of firefox + safari set this correctly
      lang = navigator.language;
    }

    return this.getValidLang(lang, false);

  };

  /**
   * @method getUrlLangParams
   * @return
   **/
  p.getLangUrlParams = function() {

    var params = queryString.parse(location.search);

    if(params && params.lang) {
      return this.getValidLang(params.lang, true);
    }

    return null;
  };

  /**
   * @method getValidLang
   * @return
   **/
  p.getValidLang = function(lang, isUrlParams) {

    var lr = lang.split('-', 2),
        parentLang = lr[0],
        l = '',
        isValid = false,
        hasRegion = false;

    for (var i = 0, numLocales = _defaults.locales.length; i < numLocales; i++) {

      if(lang.toLowerCase() === _defaults.locales[i]) {

        hasRegion = true;
        isValid = true;
        l = lang.toLowerCase();

      } else {

        if(parentLang.toLowerCase() === _defaults.locales[i] && !hasRegion) {

          isValid = true;
          l =  parentLang.toLowerCase();
        }
      }
    }

    if(isUrlParams) {
      return (isValid) ? l : null;
    } else {
      return (isValid) ? l : _defaults.lang;
    }

  };

  /**
   * @method getLang
   * @return
   **/
  p.getLang = function() {

    return _lang;
  };

  /**
   * @method getTranslations
   * @return
   **/
  p.getTranslations = function() {

    return _translations;
  };

  /**
   * @method toString
   * @return {String} a string representation of the instance.
   **/
  p.toString = function() {
    return '[I18n]';
  };
}

module.exports = I18n;
