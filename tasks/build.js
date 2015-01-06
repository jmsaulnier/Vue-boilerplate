'use strict';

var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del');

// Build Production Files, the Default Task
gulp.task('build', ['clean'], function (cb) {
  global.dist = true; // changes Watchify's build destination
  // add `watchify` task to the run sequence (below)
  runSequence('styles', ['jshint', 'watchify', 'html', 'images', 'fonts', 'copy'], 'compress', cb);
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));
