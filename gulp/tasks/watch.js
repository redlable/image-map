module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('app/pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('app/assets/js/*.js', $.gulp.series('scripts'));
    $.gulp.watch('app/assets/scss/**/*.scss', $.gulp.series('sass'));
  });

  $.gulp.task('watch:theme', function() {
    $.gulp.watch('app/assets/js/*.js', $.gulp.series('scripts:theme'));
    $.gulp.watch('app/assets/scss/**/*.scss', $.gulp.series('sass:theme'));
  });
};
