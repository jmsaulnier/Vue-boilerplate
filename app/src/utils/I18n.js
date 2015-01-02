'use strict';

var Signal = require('signals'),
    request = require('superagent'),
    queryString = require('query-string'),
    _ = require('underscore');

/**
 * I18n class
 * @module utils/I18n
 * @property {Signal} completed
 * @property {String} lang
 * @property {Object} translations
 */
class I18n {

    /**
    * @readonly
    **/
    get completed() {

      return this._completed;
    }

    /**
    * @readonly
    **/
    get lang() {

      return this._lang;
    }

    /**
    * @readonly
    **/
    get translations() {

      return this._translations;
    }

    /**
     * //
     * @method constructor
     * @param {Object} options
     **/
    constructor(options) {

      //
      this._defaults = {
        lang: 'en',
        locales: ['en'],
        directory: '/locales/',
        prefix: '-',
        ext: '.json'
      };

      _.extend(this._defaults, options);

      //
      this._lang = '';

      //
      this._translations = null;

      //
      this._completed  = new Signal();
    }

    /**
     * //
     * @method load
     **/
    load() {

      this._lang = this.getLangUrlParams() ? this.getLangUrlParams() : this.getLangBrowser();

      request
        .get(this._defaults.directory + this._lang + this._defaults.ext)
        .end(function(response){

          if(response.ok) {

            this._translations = response.text;
            this.completed.dispatch();

          } else {
            console.warn('Unable to load i18n file :: ' + this._lang);
          }

        }.bind(this));
    }

    /**
     * //
     * @method getLangBrowser
     * @return {String}
     **/
    getLangBrowser() {

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
    }

    /**
     * //
     * @method getLangUrlParams
     * @return {String}
     **/
    getLangUrlParams() {

      var params = queryString.parse(location.search);

      if(params && params.lang) {
        return this.getValidLang(params.lang, true);
      }

      return null;
    }

    /**
     * //
     * @method getValidLang
     * @param {String} lang
     * @param {Boolean} isUrlParams
     * @return {String}
     **/
    getValidLang(lang, isUrlParams) {

      var lr = lang.split('-', 2),
        parentLang = lr[0],
        l = '',
        isValid = false,
        hasRegion = false;

      for (var i = 0, numLocales = this._defaults.locales.length; i < numLocales; i++) {

        if(lang.toLowerCase() === this._defaults.locales[i]) {

          hasRegion = true;
          isValid = true;
          l = lang.toLowerCase();

        } else {

          if(parentLang.toLowerCase() === this._defaults.locales[i] && !hasRegion) {

            isValid = true;
            l =  parentLang.toLowerCase();
          }
        }
      }

      if(isUrlParams) {
        return (isValid) ? l : null;
      } else {
        return (isValid) ? l : this._defaults.lang;
      }
    }

    /**
     * //
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    toString() {

      return '[utils/I18n]';
    }
}

module.exports = I18n;
