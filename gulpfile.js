var gulp = require('gulp');
var browserSync = require('browser-sync').create(); // create a browser sync instance.
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');

gulp.task('sass', function(){
   return gulp.src([
       'scss/*.scss',
       '!css/main.css'
   ])
       .pipe(sass())
       .pipe(gulp.dest('css/'))
       .pipe(browserSync.stream());
});

gulp.task('sass-lint', function () {
    return gulp.src([
        'scss/*.scss',
        '!css/main.css'
    ])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});

gulp.task('serve', ['sass', 'sass-lint'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch(['scss/*.scss'], ['sass', 'sass-lint']);
    gulp.watch(['*.html', 'pages/*.html']).on('change', browserSync.reload);
    gulp.watch(['js/*.js']).on('change', browserSync.reload);
})

// default
gulp.task('default', ['serve']);
