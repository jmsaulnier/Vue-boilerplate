'use strict';

var gulp = require('gulp'),
    del = require('del');

// build documentation

gulp.task('docs', ['clean:docs'], function ( done ) {
  // run process
  var child = require('child_process').spawn(
    './node_modules/.bin/jsdoc',
    ['--recurse', '--configure', 'jsdoc.json', '--destination', 'docs/', 'app/src']
  );

  child.on('close', done);
  child.on('error', function reportError () {
    console.log('FATAL ERROR: JSDoc failed to start!');
  });

  child.stderr.on('data', function reportStdErr ( data ) {
    console.log(data);
  });
  child.stdout.on('data', function reportStdOut ( data ) {
    console.log(data);
  });
});

gulp.task('clean:docs', del.bind(null, ['docs/*', '!docs/.gitkeep'], {dot: true}));
