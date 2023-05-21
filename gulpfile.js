"use strict"

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;

const buildSass = () => {
    return gulp.src('./src/sass/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'))
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/css'));
}
const watchSass = () => gulp.watch('./src/sass/**/*.scss', buildSass)

const buildJs = () => {
    return gulp.src('./src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename({ basename: 'main.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'));
}
const watchJs = () => gulp.watch('./src/js/**/*.js', buildJs)

const watch = async () => {
    await watchJs()
    await watchSass()
}

gulp.task('sass', buildSass)
gulp.task('js', buildJs)
gulp.task('default', watch)
