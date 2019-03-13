'use strict';

global.$ = {
  gulp: require('gulp'),
  plugins: require('gulp-load-plugins')(),
  browserSync: require('browser-sync').create(),
  path: {
    tasks: require('./gulp/config/tasks.js')
  },
  fs: require('fs'),
  del: require('del'),
  source: {
    scss: './app/assets/scss/**/*.scss',
    js: './app/assets/js',
    drupal_theme: './'
  }
};

$.path.tasks.forEach(function (taskPath) {
  require(taskPath)();
});

// $.gulp.task('build', $.gulp.series(
//   'clean',
//   $.gulp.parallel('sass', 'pug', 'scripts:lib', 'svg', 'img', 'fonts','svg:copy')
// ));

$.gulp.task('dev', $.gulp.series(
  'clean',
  $.gulp.parallel('sass', 'scripts:lib', 'scripts', 'img')
));

$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel('sass', 'pug', 'scripts:lib', 'scripts', 'img', 'fonts')
));

$.gulp.task('copy', $.gulp.series(
  $.gulp.parallel('svg', 'img:theme')
));

$.gulp.task('theme', $.gulp.series(
  $.gulp.series($.gulp.parallel('sass:theme', 'scripts:theme'), 'watch:theme')
));

$.gulp.task('default', $.gulp.series(
  $.gulp.parallel('pug', 'sass', 'scripts:lib', 'scripts'),
  $.gulp.parallel('watch', 'serve')
));
