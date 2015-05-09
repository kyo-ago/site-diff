"use strict";
var gulp = require('gulp');

gulp.task('bump', function () {
    var bump = require('gulp-bump');
    var path = require('path');
    ['*.json', 'extension/*.json'].forEach(function (file) {
        gulp.src(file)
            .pipe(bump())
            .pipe(gulp.dest(path.dirname(file)))
        ;
    });
});

gulp.task('zip', function () {
    var zip = require('gulp-zip');
    return gulp.src([ 'extension/**' ], { base: process.cwd() })
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'))
    ;
});

(function () {
    var watchify = require('gulp-watchify');

    var bundlePaths = {
        src: [
            'src/browser_action.js',
            'src/background.js'
        ],
        dest:'extension/js/'
    };

    var watching = false;
    gulp.task('enable-watch-mode', function() { watching = true });

    gulp.task('browserify', watchify(function(watchify) {
        return gulp.src(bundlePaths.src)
            .pipe(watchify({
                watch: watching
            }))
            .pipe(gulp.dest(bundlePaths.dest))
    }));

    gulp.task('watchify', ['enable-watch-mode', 'browserify']);
})();

gulp.task('build', ['browserify']);
