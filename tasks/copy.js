'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// Copy All Files At The Root Level (src)
gulp.task('copy', function () {
  return gulp.src([
    'app/*',
    'app/**/*.json',
    '!app/src',
    '!app/*.html',
    '!app/build',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}));
});
