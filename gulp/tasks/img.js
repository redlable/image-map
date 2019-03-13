module.exports = function() {
  $.gulp.task('img', function() {
    return $.gulp.src('./app/assets/img/**/*.{png,jpg,gif,svg}')
      .pipe($.gulp.dest('img/'));
  });

  $.gulp.task('img:theme', function() {
    return $.gulp.src('./app/assets/img/**/*.{png,jpg,gif,svg}')
      .pipe($.gulp.dest($.source.drupal_theme + 'img/'));
  });
};
