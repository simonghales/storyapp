var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    concat    = require('gulp-concat'),
    watch    = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularTemplateCache = require('gulp-angular-templatecache'),
    livereload = require('gulp-livereload'),
    runSequence = require('run-sequence'),
    addStream = require('add-stream');

function prepareTemplates() {
    return gulp.src('partials/**/*.html')
        //.pipe(minify and preprocess the template html here)
        .pipe(angularTemplateCache({
            root: 'partials/'
        }));
}

gulp.task('watch', ['sass'], function() {
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

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('dev-index.html')
        .pipe(rename('index.html'))
        .pipe(assets)
        .pipe(gulpif('*.js', ngAnnotate()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCSS()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(''));
});

gulp.task('default', ['watch'], function() {
});

gulp.task('templates', function () {
    return gulp.src('dist/app.js')
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', function() {
    runSequence(
        'sass',
        'html',
        'templates'
    );
});