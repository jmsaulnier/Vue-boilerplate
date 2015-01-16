'use strict';

var Signal = require('signals'),
    request = require('superagent'),
    xtend = require('xtend'),
    queryString = require('query-string');

var opts = null,
    defaults = {
      lang: 'en',
      locales: ['en'],
      directory: '/locales/',
      prefix: '-',
      ext: '.json'
    };

/**
 * i18n
 * @module utils/i18n
 */
module.exports = {

  /**
   * @readonly
   **/
  lang: '',

  /**
   * @readonly
   **/
  translations: null,

  /**
   * @readonly
   **/
  loaded: new Signal(),

  /**
   * //
   * @method load
   **/
  load: function(options) {

    opts = xtend(defaults, options);

    this.lang = getLangUrlParams() ? getLangUrlParams() : getLangBrowser();

    request
      .get(opts.directory + this.lang + opts.ext)
      .end(function(response){

        if(response.ok) {

          this.translations = response.text;
          this.loaded.dispatch();

        } else {
          console.warn('Unable to load i18n file :: ' + this.lang);
        }

      }.bind(this));
  },

  /**
   * //
   * @method toString
   * @return {String} a string representation of the instance.
   **/
  toString: function() {

    return '[utils/I18n (lang='+this.lang+')]';
  }
};

/**
 * //
 * @method getLangBrowser
 * @private
 * @return {String}
 **/
function getLangBrowser() {

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

  return getValidLang(lang, false);

}

/**
 * //
 * @method getLangUrlParams
 * @private
 * @return {String}
 **/
function getLangUrlParams() {

  var params = queryString.parse(location.search);

  if(params && params.lang) {
    return getValidLang(params.lang, true);
  }

  return null;
}

/**
 * //
 * @method getValidLang
 * @private
 * @param {String} lang
 * @param {Boolean} isUrlParams
 * @return {String}
 **/
function getValidLang(lang, isUrlParams) {

  var lr = lang.split('-', 2),
    parentLang = lr[0],
    l = '',
    isValid = false,
    hasRegion = false;

  for (var i = 0, numLocales = opts.locales.length; i < numLocales; i++) {

    if(lang.toLowerCase() === opts.locales[i]) {

      hasRegion = true;
      isValid = true;
      l = lang.toLowerCase();

    } else {

      if(parentLang.toLowerCase() === opts.locales[i] && !hasRegion) {

        isValid = true;
        l =  parentLang.toLowerCase();
      }
    }
  }

  if(isUrlParams) {
    return (isValid) ? l : null;
  } else {
    return (isValid) ? l : opts.lang;
  }
}
