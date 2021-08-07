const gulp = require('gulp');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const rename = require('gulp-rename');

const liquidPaths = [
  '*assets/**/*',
  '*snippets/**/*',
  '*sections/**/*',
  '*templates/**/*',
  '*layout/**/*',
];

function renameHiddenFiles (path) {
  if (path.basename[0] === '_') path.basename = path.basename.substring(1);
};

gulp.task('copy', function () {
  return gulp
    .src(liquidPaths)
    .pipe(rename(renameHiddenFiles))
    .pipe(changed('dist/', { hasChanged: changed.compareContents }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy:watch', function (done) {
  watch(liquidPaths)
    .pipe(rename(renameHiddenFiles))
    .pipe(gulp.dest('dist/'));
  done();
});
