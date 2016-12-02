"use strict";

var fs           = require("fs"),
    gulp         = require("gulp"),
    csso         = require("gulp-csso"),
    rimraf       = require("gulp-rimraf"),
    uglify       = require("gulp-uglify"),
    stylus       = require("gulp-stylus"),
    concat       = require("gulp-concat"),
    browserSync  = require("browser-sync"),
    sourcemaps   = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),

    settings     = JSON.parse(fs.readFileSync("Gulpfile.json", "utf8")),
    path         = {
        src:  settings.path.src || "./src",
        root: settings.path.root || "./",
        dest: settings.path.dest || "./assets/",

        include: function () {
            var a = Array.from(arguments);
            return a.join("/").replace(/\/+/g, "/");
        },
        exclude: function () {
            return "!" + path.include.apply(this, arguments);
        }
    };


gulp.task("clear:stylus", function () {
    return gulp
        .src([
            path.include(path.dest, "css")
        ], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("stylus:main", ["clear:stylus"], function () {
    return gulp
        .src([
            path.include(path.src, "stylus/**/**.styl"),

            path.exclude(path.src, "stylus/separate/**/**.styl"),
            path.exclude(path.src, "stylus/imports/**/**.styl")
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(csso({
            sourceMap: true
        }))
        .pipe(concat("style.css"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.include(path.dest, "css")))
        .pipe(browserSync.stream());
});
gulp.task("stylus:separate", ["clear:stylus"], function () {
    return gulp
        .src([
            path.include(path.src, "stylus/separate/**/**.styl")
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.include(path.dest, "css")))
        .pipe(browserSync.stream());
});


gulp.task("clear:js", function () {
    return gulp
        .src([
            path.include(path.dest, "js")
        ], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("js:main", ["clear:js"], function () {
    return gulp
        .src([
            path.include(path.src, "js/**/**.js"),

            path.exclude(path.src, "js/separate/**/**.js")
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: true
        }))
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.include(path.dest, "js")));
});
gulp.task("js:separate", ["clear:js"], function () {
    return gulp
        .src([
            path.include(path.src, "js/separate/**/**.js")
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.include(path.dest, "js")));
});
gulp.task("js:reload", ["js:main", "js:separate"], function () {
    return gulp
        .src([
            path.include(path.src + "js/**/**.js")
        ])
        .pipe(browserSync.stream());
});


gulp.task("clear:images", function () {
    return gulp
        .src([
            path.include(path.dist, "images")
        ], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("images:copy", function () {
    return gulp
        .src([
            path.include(path.src, "images/**/**.*")
        ])
        .pipe(gulp.dest(path.include(path.dest, "images")));
});


gulp.task("php-html", function () {
    return gulp
        .src([
            path.include(path.root, "**/**.php"),
            path.include(path.root, "**/**.html")
        ])
        .pipe(browserSync.stream());
});


gulp.task("html", function () {
    return gulp
        .src(path.root + "**/**.html")
        .pipe(browserSync.stream());
});


gulp.task("stylus", [
    "clear:stylus",
    "stylus:main",
    "stylus:separate"
]);
gulp.task("js", [
    "clear:js",
    "js:main",
    "js:separate",
    "js:reload"
]);
gulp.task("images", [
    "clear:images",
    "images:copy"
]);


gulp.task("watch", function (cb) {
    browserSync.init({
        notify: false,
        https:  false,
        open:   false,
        proxy:  settings.proxy || "localhost:8888"
    }, cb);

    process.on("exit", function () {
        browserSync.exit();
    });

    gulp.watch([
        path.include(path.src, "stylus/**/**.styl")
    ], ["stylus"]);
    gulp.watch([
        path.include(path.src, "js/**/**.js")
    ], ["js"]);
    gulp.watch([
        path.include(path.src, "images/**/**.*")
    ], ["images"]);
    gulp.watch([
        path.include(path.root, "**/**.php"),
        path.include(path.root, "**/**.html")
    ], ["php-html"]);

});


gulp.task("build", ["stylus", "js", "images"]);


gulp.task("default", ["build", "watch"]);
