'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync');

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(['app/src/**/*.js', 'test/unit/specs/**/*.js', 'test/e2e/*.js'])
    // taken care of by `watchify` (remove or comment out)
    //.pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});
