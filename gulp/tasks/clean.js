module.exports = function() {
  $.gulp.task('clean', function() {
    return $.del([
      './*.html',
      'css',
      'js',
      'img',
      'fonts'
    ]);
  });
};
