"use strict";
var gulp = require('gulp');

gulp.task('zip', function () {
    var zip = require('gulp-zip');
    return gulp.src([ 'extension/**' ], { base: process.cwd() })
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('./'))
    ;
});

gulp.task('makeManifest', function () {
    var fs = require('fs');
    var pkg = require('./package.json');
    fs.writeFileSync('./extension/manifest.json', JSON.stringify({
        "name": pkg.name,
        "version": pkg.version,
        "manifest_version": 2,
        "browser_action": {
            "default_popup": "/html/browser_action.html"
        },
        "background": {
            "scripts": ["/js/background.js"],
            "persistent": false
        },
        "permissions": [
            "tabs",
            "storage",
            "unlimitedStorage",
            "<all_urls>"
        ]
    }, undefined, '    '));
});

(function () {
    var watchify = require('gulp-watchify');

    var bundlePaths = {
        src: [
            'src/capture_result.js',
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
