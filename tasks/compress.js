'use strict';

var gulp  = require('gulp');
var $     = require('gulp-load-plugins')();

// Add Gzip file
gulp.task('compress', ['uglify'], function() {

  return gulp.src('./dist/scripts/*.js')
    .pipe($.gzip())
    .pipe(gulp.dest('./dist/scripts'));
});

// Min JS file
gulp.task('uglify', function() {

  return gulp.src('./dist/scripts/*.js')
    .pipe($.uglify( {
      sequences: true,
      dead_code: true,
      conditionals: true,
      booleans: true,
      unused: true,
      if_return: true,
      join_vars: true
    }))
    .pipe(gulp.dest('./dist/scripts'));
});
