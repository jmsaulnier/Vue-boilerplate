'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

// Add Gzip file
gulp.task('compress', ['uglify'], function() {

  return gulp.src('./dist/scripts/*.js')
    .pipe($.gzip())
    .pipe(gulp.dest('./dist/scripts'));
});

// Min JS file
gulp.task('uglify', function() {

  return gulp.src('./dist/scripts/*.js')
    .pipe($.uglify())
    .pipe(gulp.dest('./dist/scripts'));
});
