var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();
var reporter = require('eslint-html-reporter');
var plumber = require('gulp-plumber');
var path     = require('path');
var fs       = require('fs');
var notifier = require('node-notifier');

var REPORT_DIR = 'reports/';
var ESLINT_FILE_NAME = 'eslint-checkstyle.xml';

var GLOB_SRC_FILES = 'app/scripts/**/*.js';

gulp.task('build', () =>
  gulp.src(GLOB_SRC_FILES)
    .pipe($.babel())
    .pipe(gulp.dest('build/scripts'))
)

gulp.task('lint', () =>
  gulp.src(GLOB_SRC_FILES)
    .pipe(plumber({
      // エラーをハンドル
      errorHandler: function(error) {
        var taskName = 'eslint';
        var title = '[task]' + taskName + ' ' + error.plugin;
        var errorMsg = 'error: ' + error.message;
        // ターミナルにエラーを出力
        console.error(title + '\n' + errorMsg);
        // エラーを通知
        notifier.notify({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.eslint.format(reporter, function(results) {
      fs.writeFileSync(path.join(REPORT_DIR, 'report-results.html'), results);
    }))
    .pipe($.eslint.failAfterError())
)
