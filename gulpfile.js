var gulp = require('gulp');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var jeet = require('jeet');
var rupture = require('rupture');
var nib = require('nib');
var prefixer = require('autoprefixer-stylus');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var del = require('del');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('stylus', function() {
    return gulp.src([
            './_assets/css/main.styl'
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [nib(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./assets/css'))
});

gulp.task('svg', function() {
    return gulp.src('./_assets/img/**/*.svg')
        .pipe(gulp.dest('./assets/img/'));
});

gulp.task('imagemin', ['svg'], function() {
    return gulp.src('./_assets/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('./assets/img/'))
});

gulp.task('js', function() {
    return gulp.src([
            //'./node_modules/jquery/dist/jquery.js',
            './_assets/js/**/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))
});

gulp.task('clean', function(cb) {
    return del('./assets/');
});

gulp.task('copy-vendor', function () {
    return gulp.src('_assets/vendor/**/*')
        .pipe(gulp.dest('assets/vendor'))
    ;
});

gulp.task('sequence', function(callback) {
    sequence(
        ['stylus', 'imagemin', 'js', 'copy-vendor'],
        'watch',
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('./_assets/css/**/*.styl', ['stylus']).on('change', browserSync.reload);
    gulp.watch('./_assets/img/**/*.{jpg,png,gif}', ['imagemin']).on('change', browserSync.reload);
    gulp.watch('./_assets/js/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['sequence'], function() {
    browserSync.init({
        port: 5000,
        server: {
            baseDir: "./"
        }      
    });
});
