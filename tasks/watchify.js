'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    browserify = require('browserify'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    babelify = require("babelify");

gulp.task('watchify', function(){

  var bundler = watchify(
    browserify()
      .transform(stringify(['.hjs', '.html', '.tpl']))
      .transform(babelify)
      .require(require.resolve('../app/src/main.js'), { entry: true }),
    {
      basedir: './app/src', // (roots __dirname)
      debug: true
    }
  );

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', $.notify.onError({
        message: 'watchify error: <%= error.message %>'
      }))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest( global.dist ? 'dist/scripts' : './app/build/' ))
      .pipe(reload({stream: true, once: true}));
  };
  // rebundle on change
  bundler.on('update', bundle);
  return bundle();
});
