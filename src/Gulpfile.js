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
    path         = settings.path,
    build        = Object.keys(settings.tasks).filter(function (key) {
        return settings.tasks[key];
    });


gulp.task("clear:stylus", function () {
    return gulp
        .src([path.dist + "css"], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("stylus:main", function () {
    return gulp
        .src([
            path.src + "stylus/**/**.styl",

            "!" + path.src + "stylus/separate/**/**.styl",
            "!" + path.src + "stylus/imports/**/**.styl"
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
        .pipe(gulp.dest(path.dist + "css"))
        .pipe(browserSync.stream());
});
gulp.task("stylus:separate", function () {
    return gulp
        .src([
            path.src + "stylus/separate/**/**.styl"
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist + "css"))
        .pipe(browserSync.stream());
});


gulp.task("clear:js", function () {
    return gulp
        .src([path.dist + "js"], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("js:main", function () {
    return gulp
        .src([
            path.src + "js/**/**.js",

            "!" + path.src + "js/separate/**/**.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: true
        }))
        .pipe(concat("main.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist + "js"));
});
gulp.task("js:separate", function () {
    return gulp
        .src([
            path.src + "js/separate/**/**.js"
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist + "js"));
});
gulp.task("js:reload", function () {
    return gulp
        .src(path.src + "js/**/**.js")
        .pipe(browserSync.stream());
});


gulp.task("clear:images", function () {
    return gulp
        .src([path.dist + "images"], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("images:copy", function () {
    return gulp
        .src([path.src + "images/**/**.*"])
        .pipe(gulp.dest(path.dist + "images"));
});


gulp.task("html", function () {
    return gulp
        .src(path.root + "**/**.html")
        .pipe(browserSync.stream());
});


gulp.task("php", function () {
    return gulp
        .src(path.root + "**/**.php")
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
        proxy:  settings.proxy
    }, cb);

    process.on("exit", function () {
        browserSync.exit();
    });

    if ("stylus" in settings.tasks) {
        gulp.watch(path.src + "stylus/**/**.styl", ["stylus"]);
    }
    if ("js" in settings.tasks) {
        gulp.watch(path.src + "js/**/**.js", ["js"]);
    }
    if ("images" in settings.tasks) {
        gulp.watch(path.src + "images/**/**.*", ["images"]);
    }
    if ("html" in settings.tasks) {
        gulp.watch(path.root + "**/**.html", ["html"]);
    }
    if ("php" in settings.tasks) {
        gulp.watch(path.root + "**/**.php", ["php"]);
    }
});


gulp.task("build", build);


gulp.task("default", ["build", "watch"]);
