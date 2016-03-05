var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpif = require('gulp-if');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV== 'development';

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.sass')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('build/css'));
});

gulp.task('clean', function() {
    return del('build');
});

gulp.task('assets', function(){
   return gulp.src('src/**/*.*')
       .pipe(gulp.dest('build'))
});

gulp.task('build', gulp.series('clean', gulp.parallel('sass', 'assets')));

gulp.watch('src/**/*.*', gulp.series('build'));