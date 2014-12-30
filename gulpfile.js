'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    del = require('del'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    pagespeed = require('psi'),
    reload = browserSync.reload,
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    stringify = require('stringify'),
    to5ify = require("6to5ify");

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

/**
 * BROWSERIFY / WATCHIFY TASK ADDED HERE
 */
var dist = false; // set to true when `default` task is run
gulp.task('watchify', function(){

  var bundler = watchify(
    browserify()
      .transform(stringify(['.hjs', '.html', '.tpl']))
      .transform(to5ify)
      .require(require.resolve('./app/src/main.js'), { entry: true }),
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
      .pipe(gulp.dest( dist ? 'dist/scripts' : './app/build/' ))
      .pipe(reload({stream: true, once: true}));
  };
  // rebundle on change
  bundler.on('update', bundle);
  return bundle();
});

// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src(['app/src/**/*.js']) // /*, 'test/unit/specs/**/*.js', 'test/e2e/*.js'] */
    // taken care of by `watchify` (remove or comment out)
    //.pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

// Optimize Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size({title: 'images'}));
});

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

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
  return gulp.src(['app/fonts/**'])
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size({title: 'fonts'}));
});

// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'app/styles/*.scss',
    'app/styles/**/*.css',
    'app/src/ui/modules/**/*.scss',
    'app/src/ui/components/**/*.scss'
  ])
    .pipe($.changed('styles', {extension: '.scss'}))
    .pipe($.sass({
      precision: 10
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate And Minify Styles
    .pipe($.if('*.css', $.csso()))
    .pipe(gulp.dest('dist/styles'))
    .pipe($.size({title: 'styles'}));
});

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
    // Output Files
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'html'}));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

// Watch Files For Changes & Reload
gulp.task('serve', ['watchify'], function () {
  browserSync({
    notify: false,
    // Customize the BrowserSync console logging prefix
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app']
  });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/src/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/src/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});

// Add Gzip file
gulp.task('compress', function() {

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

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
  dist = true; // changes Watchify's build destination
  // add `watchify` task to the run sequence (below)
  runSequence('styles', ['jshint', 'watchify', 'html', 'images', 'fonts', 'copy'] , 'uglify', 'compress', cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
  // By default, we use the PageSpeed Insights
  // free (no API key) tier. You can use a Google
  // Developer API key if you have one. See
  // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
  url: 'https://example.com',
  strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
// try { require('require-dir')('tasks'); } catch (err) { console.error(err); }
