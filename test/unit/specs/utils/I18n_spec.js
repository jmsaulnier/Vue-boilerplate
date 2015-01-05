'use strict';

var test = require('prova'),
    i18n = require('../../../../app/src/utils/i18n');


/*
* Load locale file (when only "fr" available
**/

test('utils/I18n -- load locale file (when only "fr" available) ', function (t) {

  t.plan(2);

  var lang = 'fr';
  var locales = ['fr'];

  i18n.completed.addOnce(boot);
  i18n.load({ directory: '../../../../app/locales/', lang: lang, locales: locales });

  function boot() {
    t.pass('load locale files: ' + i18n.lang);

    t.equal(i18n.lang, lang);
  }
});

/*
 * Package name
 **/

test('utils/I18n -- package name', function (t) {

  t.plan(2);

  var lang = 'fr';
  var locales = ['fr'];

  i18n.completed.addOnce(boot);
  i18n.load({ directory: '../../../../app/locales/', lang: lang, locales: locales });

  function boot() {
    t.pass('load locale files: ' + i18n.lang);

    t.equal(i18n.toString(), '[utils/I18n (lang='+i18n.lang+')]');
  }



});
