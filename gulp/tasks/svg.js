module.exports = function() {
  $.gulp.task('svg', () => {
    return $.gulp.src('./app/assets/img/svg/*.svg')
      .pipe($.plugins.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.plugins.cheerio({
        run: function($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: { xmlMode: true }
      }))
      .pipe($.plugins.replace('&gt;', '>'))
      .pipe($.plugins.svgSprite({
        mode: {
          symbol: {
            sprite: 'sprite.svg'
          }
        }
      }))
      .pipe($.gulp.dest('./img/svg/'));
  });
};
