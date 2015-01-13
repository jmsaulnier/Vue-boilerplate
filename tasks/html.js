'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

var version = require('../package.json').version;

// Scan Your HTML For Assets & Optimize Them
gulp.task('html', function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/**/*.html')
    .pipe(assets)
    // Concatenate And Minify JavaScript
    .pipe($.if('*.js', $.uglify({preserveComments: 'some'})))
    // Remove Any Unused CSS
    // Note: If not using the Style Guide, you can delete it from
    // the next line to only include styles your project uses.
    .pipe($.if('*.css', $.uncss({
      html: [
        'app/index.html'
      ],
      // CSS Selectors for UnCSS to ignore
      ignore: [

      ]
    })))


    // Concatenate And Minify Styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    // Minify Any HTML
    .pipe($.if('*.html', $.minifyHtml({empty:true})))
    .pipe($.frep({'@@version': version}))
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});
