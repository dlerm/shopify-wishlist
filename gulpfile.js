const gulp = require('gulp');

require('require-dir')('./tasks');

// build
gulp.task(
  'build',
  gulp.series('clean:dist', 'copy')
);

// watch
gulp.task(
  'watch',
  gulp.series(
    gulp.parallel(
      'copy:watch',
    ),
    gulp.series('upload:watch')
  )
);

// dev
gulp.task('dev', gulp.series('build', 'watch'));

// default
gulp.task('default', gulp.series('dev'));
