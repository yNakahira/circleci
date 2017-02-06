var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var $ = gulpLoadPlugins();

var REPORT_DIR = 'reports/';
var ESLINT_FILE_NAME = 'eslint-checkstyle.xml';

var GLOB_SRC_FILES = 'app/scripts/**/*.js';

gulp.task('build', () =>
  gulp.src(GLOB_SRC_FILES)
    .pipe($.babel())
    .pipe(gulp.dest('build/scripts'))
)

gulp.task('eslint', () =>
  gulp.src(GLOB_SRC_FILES)
    .pipe($.eslint({useEslintrc: true}))
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError())
)

gulp.task('lint', ['eslint'], function () {
  gulp.src(REPORT_DIR + '*.xml')
    .pipe($.prettyData({ type: 'prettify' }))
    .pipe(gulp.dest(REPORT_DIR));
});
