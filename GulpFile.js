var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat    = require('gulp-concat'),
    watch    = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload');

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('css/**/*.scss', ['sass']);
});

gulp.task('sass', function () {
    gulp.src('css/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('css'))
        .pipe(minifyCSS())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('default', ['watch'], function() {
});