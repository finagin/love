"use strict";

var fs = require("fs"),
    gulp = require("gulp"),
    csso = require("gulp-csso"),
    file = require('gulp-file'),
    rimraf = require("gulp-rimraf"),
    uglify = require("gulp-uglify"),
    stylus = require("gulp-stylus"),
    concat = require("gulp-concat"),
    browserSync = require("browser-sync"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("gulp-autoprefixer"),

    defaults = function defaults(obj, def) {
        function req(obj, def) {
            for (var key in def) {
                if (obj[key] !== undefined) {
                    if (typeof obj[key] == "object") {
                        req(obj[key], def[key]);
                    }
                } else {
                    obj[key] = def[key];
                }
            }
        }

        req(obj, def);

        return obj;
    },

    settings = defaults(
        JSON.parse(fs.readFileSync("Gulpfile.json", "utf8")),
        {
            "path": {
                "src": "./src",
                "root": "./",
                "dest": "./assets/"
            },
            "proxy": {
                "protocol": "http://",
                "path": "localhost",
                "port": 8888
            },
            "gitignore": true
        }
    ),
    path = {
        src: settings.path.src,
        root: settings.path.root,
        dest: settings.path.dest,

        include: function include() {
            var a = Array.from(arguments);
            return a.join("/").replace(/\/+/g, "/");
        },
        exclude: function exclude() {
            return "!" + path.include.apply(this, arguments);
        }
    },
    proxy = {
        "protocol": settings.proxy.protocol,
        "path": settings.proxy.path,
        "port": settings.proxy.port,
        get url() {
            var url = "";

            url += this.protocol;
            url += this.path;
            url += (this.port != "80" ? (":" + this.port) : "");

            return url;
        }
    },
    buildTasks;


gulp.task("stylus:clear", function () {
    return gulp
        .src([
            path.include(path.dest, "css")
        ], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("stylus:main", ["stylus:clear"], function () {
    return gulp
        .src([
            path.include(path.src, "stylus/**/**.{styl,css}"),

            path.exclude(path.src, "stylus/separate/**/**.{styl,css}"),
            path.exclude(path.src, "stylus/imports/**/**.{styl,css}")
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(csso({
            sourceMap: true
        }))
        .pipe(concat("style.css"))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.include(path.dest, "css")))
        .pipe(browserSync.stream());
});
gulp.task("stylus:separate", ["stylus:clear"], function () {
    return gulp
        .src([
            path.include(path.src, "stylus/separate/**/**.{styl,css}")
        ])
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.include(path.dest, "css")))
        .pipe(browserSync.stream());
});


gulp.task("js:clear", function () {
    return gulp
        .src([
            path.include(path.dest, "js")
        ], {read: false})
        .pipe(rimraf({force: true}));
});
gulp.task("js:main", ["js:clear"], function () {
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
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.include(path.dest, "js")));
});
gulp.task("js:separate", ["js:clear"], function () {
    return gulp
        .src([
            path.include(path.src, "js/separate/**/**.js")
        ])
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: true
        }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(path.include(path.dest, "js")));
});
gulp.task("js:reload", ["js:main", "js:separate"], function () {
    return gulp
        .src([
            path.include(path.src + "js/**/**.js")
        ])
        .pipe(browserSync.stream());
});


gulp.task("images:clear", function () {
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


gulp.task("git-ignore", function () {
    return file(".gitignore", "*", {src: true})
        .pipe(gulp.dest(path.dest));
});


gulp.task("php-html", function () {
    return gulp
        .src([
            path.include(path.root, "**/**.{php,html}")
        ])
        .pipe(browserSync.stream());
});


gulp.task("stylus", [
    "stylus:clear",
    "stylus:main",
    "stylus:separate"
]);
gulp.task("js", [
    "js:clear",
    "js:main",
    "js:separate",
    "js:reload"
]);
gulp.task("images", [
    "images:clear",
    "images:copy"
]);


gulp.task("watch", function (cb) {
    if (settings.proxy !== false) {
        browserSync.init({
            notify: true,
            https: false,
            open: true,
            proxy: {
                target: proxy.url,
                ws: true
            },

            serveStatic: [
                settings.path.dest
            ],
            localOnly: true
        }, cb);

        process.on("exit", function () {
            browserSync.exit();
        });
    }

    gulp.watch([
        path.include(path.src, "stylus/**/**.{styl,css}")
    ], ["stylus"]);
    gulp.watch([
        path.include(path.src, "js/**/**.js")
    ], ["js"]);
    gulp.watch([
        path.include(path.src, "images/**/**.*")
    ], ["images"]);
    gulp.watch([
        path.include(path.root, "**/**.{php,html}")
    ], ["php-html"]);

});

buildTasks = ["stylus", "js", "images"];
buildTasks.unshift.apply(buildTasks, settings.gitignore ? ["git-ignore"] : []);
gulp.task("build", buildTasks);


gulp.task("default", ["build", "watch"]);
