const gulp = require('gulp');
const path = require('path');
const themeKit = require('@shopify/themekit');

const options = {
  vars: path.resolve(__dirname, '../.env'),
  dir: path.resolve(__dirname, '../dist'),
};

gulp.task("upload:deploy", function () {
  themeKit.command('deploy', options);
});

gulp.task("upload:watch", function () {
  themeKit.command('watch', options);
});
