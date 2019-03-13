module.exports = function() {
  $.gulp.task('scripts:lib', function() {
    return $.gulp.src([
        // 'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/slick-carousel/slick/slick.js',
        // 'app/bower_components/axios/dist/axios.js',
        // 'app/bower_components/vue/dist/vue.js',
        'app/assets/js/libs/*.js'
      ])
      .pipe($.plugins.concat('libs.min.js'))
      .pipe($.gulp.dest('js/'))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('scripts', function() {
    return $.gulp.src('app/assets/js/*.js')
      .pipe($.plugins.sourcemaps.init())
      .pipe($.plugins.babel({
        presets: ['env']
      }))
      .on('error', $.plugins.notify.onError(function(err) {
        return {
          title: 'Scripts',
          message: err.message
        };
      }))
      .pipe($.plugins.sourcemaps.write('.'))
      .pipe($.gulp.dest('js/'))
      .pipe($.browserSync.reload({
        stream: true
      }));
  });

  $.gulp.task('scripts:theme', function() {
    return $.gulp.src('app/assets/js/*.js')
      .pipe($.plugins.sourcemaps.init())
      .pipe($.plugins.babel({
        presets: ['env']
      }))
      .on('error', $.plugins.notify.onError(function(err) {
        return {
          title: 'Scripts',
          message: err.message
        };
      }))
      .pipe($.plugins.sourcemaps.write('.'))
      .pipe($.gulp.dest('js/'));
  });
};
