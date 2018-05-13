var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifyjs = require('gulp-uglifyjs');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var image = require('gulp-image');
var minCss = require('gulp-minify-css');

var config = {
    app: './app',
    dest: './dest'
};

gulp.task('html', function () {
    gulp.src(config.app + '/**/*.html')
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('img', function () {
    gulp.src(config.app + '/img/**/*.jpg')
        .pipe(image())
        .pipe(gulp.dest(config.dest + '/img'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function () {
    gulp.src(config.app + '/sass/**/*.sass')
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minCss())
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
    gulp.src(config.app + '/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function () {
    gulp.watch(config.app + '/sass/**/*.sass',['sass']);
    gulp.watch(config.app + '/css/**/*.css',['css']);
    gulp.watch(config.app + '/**/*.html',['html']);
    gulp.watch(config.app + '/js/**/*.js',['js']);
});

gulp.task('server',function () {
    browserSync({
        server: {
            baseDir:config.dest
        }
    });
});

gulp.task('default', ['img', 'sass', 'js', 'html', 'watch', 'server']);