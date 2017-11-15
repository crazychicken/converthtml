var gulp = require('gulp');
var gulp_wait = require('gulp-wait');

var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');

var gulp_file_include = require('gulp-file-include');
var browser_sync = require('browser-sync').create();

// SYNC SASS
gulp.task('sass', function(){
    gulp.src(['./sass/**/*.scss'])
    .pipe(sass())
    .pipe(cssmin())
    .pipe(gulp.dest('./public/theme/css'))
    .pipe(browser_sync.stream());
});

// SASS ALL LIBRARY
gulp.task('js', function(){
    gulp.src(['./theme/js/*.js'])
    .pipe(gulp.dest('./public/theme/js'))
});

// SYNC HTML
gulp.task('include-html', function(){
    gulp.src(['./html/*.html'])
    .pipe(gulp_wait(1000))
    .pipe(gulp_file_include())
    .pipe(gulp.dest('./public'))
    .pipe(browser_sync.stream());
});

// COPY Site Map
gulp.task('copy-site-map', function() {
    gulp.src([
        './html/sitemap/**',
    ])
    .pipe(gulp.dest('./public'));
});

// COPY IMAGES
gulp.task('copy-img', function(){
    gulp.src([
        './theme/images/**/*.png',
        './theme/images/**/*.jpg',
        './theme/images/**/*.gif',
        './theme/images/**/*.svg'
    ])
    .pipe(gulp.dest('./public/theme/images'));
});

gulp.task("sync", ['include-html', 'sass', 'js'], function(){
    browser_sync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch(['./html/**/*.html', './html/html-style/*.css'], ['include-html']);
    gulp.watch(['./sass/**/*.scss'], ['sass', 'include-html']);
    gulp.watch(['./theme/js/*.js'], ['js', 'include-html']);
})

gulp.task('default', ['sync', 'copy-img', 'copy-site-map']);
