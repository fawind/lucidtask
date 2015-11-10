var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var nginclude = require('gulp-nginclude');
var gulpCopy = require('gulp-copy');
var clean = require('gulp-clean');
var ngAnnotate = require('gulp-ng-annotate');


gulp.task('usemin', function() {
  gulp.src('./public/index.html')
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({empty: true})],
      js: [ngAnnotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('build/public'));
});

gulp.task('views:dist', function() {
  gulp.src(['./public/index.html', './public/templates/*.html'])
    .pipe(nginclude())
    .pipe(minifyHtml({empty:true}))
    .pipe(gulp.dest('build/public/templates'));
});

gulp.task('copyResources', function() {
  gulp.src(['./public/font/**/*', './public/favicon.png', 'app.yaml'])
    .pipe(gulpCopy('./build'));
});

gulp.task('clean', function() {
  return gulp.src('./build', {read: false})
    .pipe(clean());
});

gulp.task('default', ['build']);
gulp.task('build', ['usemin', 'views:dist', 'copyResources']);
