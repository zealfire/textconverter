
var gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    jshint = require('gulp-jshint'),
    jslint = require('gulp-jslint');


gulp.task('build', function () {
  return gulp.src('static/javascripts/**/*.js')
    .pipe(concat('build.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('static/javascripts/'));
});

gulp.task('jslint', function () {
  return gulp.src(['static/javascripts/**/*.js'])

    // pass your directives 
    // as an object 
    .pipe(jslint({
      // these directives can 
      // be found in the official 
      // JSLint documentation. 
      node: true,
      evil: true,
      nomen: true,

      // you can also set global 
      // declarations for all source 
      // files like so: 
      global: [],
      predef: [],
      // both ways will achieve the 
      // same result; predef will be 
      // given priority because it is 
      // promoted by JSLint 

      // pass in your prefered 
      // reporter like so: 
      reporter: 'default',
      // ^ there's no need to tell gulp-jslint 
      // to use the default reporter. If there is 
      // no reporter specified, gulp-jslint will use 
      // its own. 


      // specify whether or not 
      // to show 'PASS' messages 
      // for built-in reporter 
      errorsOnly: false
    }))

    // error handling: 
    // to handle on error, simply 
    // bind yourself to the error event 
    // of the stream, and use the only 
    // argument as the error object 
    // (error instanceof Error) 
    .on('error', function (error) {
        console.error(String(error));
    });
});

gulp.task('compile-less', function() {  
  	gulp.src('static/less/main.less')
    .pipe(less())
    .pipe(gulp.dest('static/stylesheets/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {  
  	gulp.watch('static/less//**/*.less' , ['compile-less']);
    gulp.watch('static/javascripts//**/*.js', ['lint']);
  	var server = livereload();
});

gulp.task('lint', function() {
  return gulp.src('static/javascripts//**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['compile-less', 'watch-less']);
