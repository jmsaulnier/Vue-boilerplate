'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    parallelize = require('concurrent-transform'),
    fs = require('fs');

gulp.task('publish', function() {

  var options = {
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: process.env.AWS_BUCKET
  };

  if (fs.existsSync('env.json')) {
    options = require('../env.json').aws;
  }

  if (!options || !options.key || !options.secret || !options.bucket) {
    console.log('skipping publish - credentials missing');
    return;
  }

  var publisher = $.awspublish.create(options);

  return gulp.src('./app/dist/**/*')
    .pipe(parallelize(publisher.publish(), 10))
    .pipe($.awspublish.reporter())

    .on('end', function() {
      console.log('publish end...');
    })

    .on('finish', function() {
      console.log('publish finish...');
    });
});
