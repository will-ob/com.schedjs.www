
var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    coffee = require('gulp-coffee'),
    sass   = require('gulp-sass');

gulp.task('copy', function(){

  return gulp.src([
    'src/**/*.handlebars',
    'src/**/*.css',
    'src/**/*.js'
    ]).pipe(gulp.dest('./build/'))
});

gulp.task('vendor', function(){

  return gulp.src([
    'vendor/**/*.html',
    'vendor/**/*.css',
    'vendor/**/*.js',
    'vendor/**/*.{eot,svg,ttf,woff}'
  ]).pipe(gulp.dest('./build/vendor/'));
});

gulp.task('coffee', function(){

  return gulp.src('src/**/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('./build/'));

});

gulp.task('scss', function(){

  return gulp.src(['src/**/index.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./build/'));

});


gulp.task('html', function(){

  return gulp.src(['src/**/*.html'])
    .pipe(wrap({src: 'src/.templates/htmlTemplate.tmpl'}))
    .pipe(gulp.dest('build/'));

});

gulp.task('watch', function(){
  gulp.watch('src/**/*{js,css,json,handlebars}', ['copy']);
  gulp.watch('src/**/*.coffee', ['coffee']);
  gulp.watch('src/**/*.scss', ['scss']);
});

gulp.task('default', ['copy', 'html', 'vendor', 'coffee', 'scss']);

