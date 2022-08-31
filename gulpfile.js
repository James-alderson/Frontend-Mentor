// Initialize Modules
const { src, dest, watch, series, parallel } = require("gulp")

// Import packages
const sass = require("gulp-sass")(require("sass"))
const postcss = require("gulp-postcss")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")
const concat = require("gulp-concat")
const terser = require("gulp-terser")
const imagemin = require("gulp-imagemin")
const avif = require("gulp-avif")
const replace = require("gulp-replace")
const ttf2woff = require("gulp-ttf2woff")
const browser_sync = require("browser-sync").create()

// Files Path
const files = {
  scssPath: "src/scss/**/*.scss",
  jsPath: "src/js/**/*.js",
  imagePath: "src/images/**/*",
  screenPath: "src/screenshots/**/*.png",
  fontPath: "src/fonts/**/*.ttf"
}

// Scss Task
function scss_Task() {
  return src(files.scssPath, { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer("last 4 versions"), cssnano()]))
    .pipe(dest("dist/css", { sourcemaps: "." }))
}

// JavaScript Task
function js_Task() {
  return src(files.jsPath)
    .pipe(concat("script.js"))
    .pipe(terser())
    .pipe(dest("dist/js"))
}

// Imagemin Task
function imagemin_Task() {
  return src(files.imagePath)
    .pipe(imagemin([
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]).on("error", error => console.log(error)))
    .pipe(dest("dist/images"))
}

// Convert Images to Avif format
function avif_Task() {
  return src(files.screenPath)
    .pipe(avif())
    .pipe(dest("dist/screenshots"))
}

// Font Task
function font_task() {
  return src(files.fontPath)
    .pipe(ttf2woff())
    .pipe(dest("dist/fonts"));
}

// Cachebust Task
function cachebust_Task() {
  let dateString = new Date().getTime()

  return src(["index.html"])
    .pipe(replace(/cb=\d+/g, "cb=" + dateString))
    .pipe(dest("."))
}

// BrowserSync Task
function browserSync_Task(callback) {
  browser_sync.init({
    server: {
      baseDir: "."
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0"
      }
    }
  })
  callback()
}
function browserSyncReload(callback) {
  browser_sync.reload()
  callback()
}

// Watch Task
function watch_Tasks() {
  watch([files.scssPath, files.jsPath], series(parallel(scss_Task, js_Task), cachebust_Task))
}

// BrowserSync Watch Task
function bsWatch_Task() {
  watch("index.html", browserSyncReload)
  watch([files.scssPath, files.jsPath], series(parallel(scss_Task, js_Task), cachebust_Task))
}

// Gulp Default Task
exports.default = series(parallel(scss_Task, js_Task, font_task), cachebust_Task, imagemin_Task, avif_Task, watch_Tasks)
exports.bs = series(parallel(scss_Task, js_Task, font_task), cachebust_Task, imagemin_Task, avif_Task, browserSync_Task, bsWatch_Task)
