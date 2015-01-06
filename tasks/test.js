'use strict';

var gulp = require('gulp');

//

gulp.task('test', function ( done ) {
  // run process
  var child = require('child_process').spawn(
    './node_modules/.bin/prova',
    ['test/**/*.js', '-t', '6to5ify', '-b', '-l', 'safari']
  );

  child.on('close', done);
  child.on('error', function reportError () {
    console.log('FATAL ERROR: Test failed to start!');
  });
});
