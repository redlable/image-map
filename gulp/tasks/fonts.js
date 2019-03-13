module.exports = function() {
  $.gulp.task('fonts', function() {
    return $.gulp.src('./app/assets/fonts/**/*')
      .pipe($.gulp.dest('fonts/'));
  });

  $.gulp.task('fonts:theme', function() {
    return $.gulp.src('./app/assets/fonts/**/*')
      .pipe($.gulp.dest($.source.drupal_theme + 'fonts/'));
  });
};
