
var gulp = require('gulp'),
    wrap = require('gulp-wrap'),
    coffee = require('gulp-coffee'),
    template = require('gulp-template'),
    env      = require('node-env-file'),
    sass   = require('gulp-sass');

env(__dirname + '/.env');

if(process.env.ENVIRONMENT){
  env(__dirname + '/.env-' + process.env.ENVIRONMENT, {overwrite: true});
}

var config = {
  hosts: {
    app: process.env.APP_URL
  }
}

console.log(process.env)

gulp.task('copy', function(){

  return gulp.src([
    'src/**/*.handlebars',
    'src/**/*.css',
    'src/**/*.js'
    ]).pipe(gulp.dest('build/'))
});

gulp.task('vendor', function(){

  return gulp.src([
    'vendor/**/*.html',
    'vendor/**/*.css',
    'vendor/**/*.js',
    'vendor/**/*.{eot,svg,ttf,woff}'
  ]).pipe(gulp.dest('build/vendor/'));
});

gulp.task('coffee', function(){

  return gulp.src('src/**/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('build/'));

});

gulp.task('scss', function(){

  return gulp.src(['src/**/index.scss'])
    .pipe(sass())
    .pipe(gulp.dest('build/'));

});


gulp.task('html', function(){

  return gulp.src(['src/**/index.html'])
    .pipe(template(config))
    .pipe(wrap({src: 'src/.templates/html.tmpl'}))
    .pipe(gulp.dest('build/'));

});

gulp.task('watch', function(){
  gulp.watch('src/**/*{js,css,json,handlebars}', ['copy']);
  gulp.watch('src/**/*.coffee', ['coffee']);
  gulp.watch('src/**/*.scss', ['scss']);
  gulp.watch('src/**/index.html', ['html']);
});

gulp.task('default', ['copy', 'html', 'vendor', 'coffee', 'scss']);

