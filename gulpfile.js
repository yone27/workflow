// dependencies
const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const cssnano = require('gulp-cssnano')
const imagemin = require('gulp-imagemin')
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');

// main function
gulp.task("default",() => {
    browserSync.init({
        server: "./app"
    });
    //          cuando alla cambio / ejecuta esto
    gulp.watch('app/js/*.js', gulp.series('minJs')).on('change', browserSync.reload)
    gulp.watch("./scss/**/*.scss", gulp.series('minCss'));
    gulp.watch("./*.html", gulp.series('minHtml')).on('change', browserSync.reload)
});

// minify images
gulp.task('minImg', () =>
    gulp.src('app/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/img/dist/'))
);

// minify html
gulp.task('minHtml', () => {
    return gulp.src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('app/'));
});

// minify css
gulp.task('minCss', () => {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
})

// minify js
gulp.task("minJs", () => {
    gulp.src('app/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('app/js/dist'))
});

