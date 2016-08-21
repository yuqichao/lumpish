var gulp = require('gulp'),
    minify_js = require('gulp-uglify'),
    less = require('gulp-less'),
    minify_css = require('gulp-clean-css'),
    concat_js = require('gulp-concat'),
    auto_prefix = require('gulp-autoprefixer'),
    source_map = require('gulp-sourcemaps');

/* .css */

gulp.task('resolve_css', function(){
    return gulp.src('less/app.less')
            .pipe(less())
            .pipe(auto_prefix())
            .pipe(minify_css())
            .pipe(gulp.dest('css/'));
});


/* .js */

gulp.task('resolve_js', function(){
    return gulp.src(['js/*.js', '!js/main.js'])
        .pipe(source_map.init())
        .pipe(minify_js())
        .pipe(concat_js('main.js'))
        .pipe(source_map.write())
        .pipe(gulp.dest('js/'));
});

/* .default */

gulp.task('default', [
    'resolve_css'
]);