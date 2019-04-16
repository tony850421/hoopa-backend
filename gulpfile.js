var gulp = require('gulp'),
  usemin = require('gulp-usemin'),
  wrap = require('gulp-wrap'),
  connect = require('gulp-connect'),
  watch = require('gulp-watch'),
  minifyCss = require('gulp-cssnano'),
  minifyJs = require('gulp-uglify'),
  concat = require('gulp-concat'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  minifyHTML = require('gulp-htmlmin'),
  del = require('del')

var paths = {
  scripts: 'src/js/**/*.*',
  styles: 'src/less/**/*.*',
  images: 'src/img/**/*.*',
  templates: 'src/templates/**/*.html',
  index: 'src/index.html',
  font_awesome_fonts: 'node_modules/font-awesome/**/*.*',
  bootstrap_fonts: 'node_modules/bootstrap/**/*.*',
  microsoftyahei_fonts: 'src/fonts/MicrosoftYaHei/*.*',
  backendHoopa_fonts: 'src/fonts/BackendHoopa/**/*.*',
  backendHoopaMenu_fonts: 'src/fonts/BackendHoopaMenu/**/*.*'
}

/**
 * Handle bower components from index
 */
gulp.task('usemin', function () {
  return gulp.src(paths.index)
    .pipe(usemin({
      js: [minifyJs(), 'concat'],
      css: [minifyCss({keepSpecialComments: 0}), 'concat']
    }))
    .pipe(gulp.dest('dist/'))
})

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-fontawesome_fonts', 'copy-bootstrap_fonts', 'copy-microsoftyahei_fonts', 'copy-BackendHoopa_fonts', 'copy-BackendHoopaMenu_fonts'])

gulp.task('copy-fontawesome_fonts', function () {
  return gulp.src(paths.font_awesome_fonts)
    .pipe(gulp.dest('dist/lib/fonts/FontAwesome'))
})

gulp.task('copy-bootstrap_fonts', function () {
  return gulp.src(paths.bootstrap_fonts)
    .pipe(gulp.dest('dist/lib/fonts/Bootstrap'))
})

gulp.task('copy-microsoftyahei_fonts', function () {
  return gulp.src(paths.microsoftyahei_fonts)
    .pipe(gulp.dest('dist/lib/fonts/MicrosoftYaHei'))
})

gulp.task('copy-BackendHoopa_fonts', function () {
  return gulp.src(paths.backendHoopa_fonts)
    .pipe(gulp.dest('dist/lib/fonts/BackendHoopa'))
})

gulp.task('copy-BackendHoopaMenu_fonts', function () {
  return gulp.src(paths.backendHoopaMenu_fonts)
    .pipe(gulp.dest('dist/lib/fonts/BackendHoopaMenu'))
})

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates'])

gulp.task('custom-images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/img'))
})

gulp.task('custom-js', function () {
  return gulp.src(paths.scripts)
    .pipe(minifyJs())
    .pipe(concat('dashboard.min.js'))
    .pipe(gulp.dest('dist/js'))
})

gulp.task('custom-less', function () {
  return gulp.src(paths.styles)
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
})

gulp.task('custom-templates', function () {
  return gulp.src(paths.templates)
    .pipe(minifyHTML())
    .pipe(gulp.dest('dist/templates'))
})

gulp.task('clean', function () {
  return del(['build'])
})

/**
 * Live reload server
 */
gulp.task('webserver', function () {
  connect.server({
    root: 'dist',
    livereload: true,
    port: 8888
  })
})

gulp.task('livereload', function () {
  gulp.src(['dist/**/*.*'])
    .pipe(watch(['dist/**/*.*']))
    .pipe(connect.reload())
})

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom'])
gulp.task('default', [ 'clean', 'build', 'webserver', 'livereload'])
