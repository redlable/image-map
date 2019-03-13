module.exports = function() {
  $.gulp.task('pug', function() {
    return $.gulp.src('app/pug/pages/*.pug')
      .pipe($.plugins.pug({
        pretty: true
      }))
      .on('error', $.plugins.notify.onError(function(err) {
        return {
          title: 'Pug',
          message: err.message
        };
      }))
      .pipe($.gulp.dest('./'))
      .on('end', $.browserSync.reload);
  });
};
