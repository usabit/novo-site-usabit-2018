var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
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
        //.pipe(connect.reload());
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
        //.pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './_assets/js/**/*.js'
        ])
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/'))
        //.pipe(connect.reload());
});

gulp.task('clean', function(cb) {
    return del(['./assets/', 'bower_components/']);
});

gulp.task('sequence', function(callback) {
    sequence(
        ['stylus', 'imagemin', 'js'],
        'watch',
        callback
    );
});

gulp.task('watch', function() {
    gulp.watch('./_assets/css/**/*.styl', ['stylus']).on('change', browserSync.reload);
    gulp.watch('./_assets/img/**/*.{jpg,png,gif}', ['imagemin']).on('change', browserSync.reload);
    gulp.watch('./_assets/js/**/*.js', ['js']).on('change', browserSync.reload);
    gulp.watch('./*.html').on('change', browserSync.reload);
    //gulp.watch('./*.html', ['reload']);
});

//gulp.task('reload', function() {
    //gulp.src(['./assets/**/*', '*.html'])
        //.pipe(connect.reload());
//});

gulp.task('default', ['sequence'], function() {
    // BowserSync
    browserSync.init({
        port: 5000,
        server: {
            baseDir: "./"
        }      
    });
    /* Gulp Connect
    connect.server({
        port: 8888,
        livereload: true
    });
    */
});
