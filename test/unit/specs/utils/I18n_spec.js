'use strict';

var test = require('prova'),
    I18n = require('../../../../app/src/utils/I18n');


/*
* Load locale file (when only "fr" available
**/

test('utils/I18n -- load locale file (when only "fr" available) ', function (t) {

  t.plan(3);

  var lang = 'fr';
  var locales = ['fr'];

  var i18n = new I18n( { directory: '../../../../app/locales/', lang: lang, locales: locales });
  i18n.completed.addOnce(boot);

  //
  t.equal(i18n.getValidLang(lang, false), lang);

  i18n.load();

  function boot() {
    t.pass('load locale files: ' + i18n.lang);

    t.equal(i18n.lang, lang);
  }
});

/*
 * Package name
 **/

test('utils/I18n -- package name', function (t) {

  t.plan(1);

  var lang = 'fr';
  var locales = ['fr'];

  var i18n = new I18n( { directory: '../../../../app/locales/', lang: lang, locales: locales });

  t.equal(i18n.toString(), '[utils/I18n]');

});
