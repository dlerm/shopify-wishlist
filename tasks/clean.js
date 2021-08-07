const gulp = require('gulp');
const clean = require('gulp-clean');
const fs = require('fs');

gulp.task('clean:dist', function (done) {
  if (fs.existsSync('dist')) return gulp.src(['dist'], { read: false }).pipe(clean());
  else done();
});
