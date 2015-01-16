'use strict';

var gulp = require('gulp'),
    w3cjs = require('gulp-w3cjs');

// Add W3C validator file
gulp.task('w3c', function() {

  return gulp.src('app/*.html')
    .pipe(w3cjs());
});
