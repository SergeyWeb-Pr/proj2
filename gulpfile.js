const {
  src,
  dest,
  watch,
  parallel
} = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const fileInclude   = require('gulp-file-include');

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify:false
  })
}

function htmlInclude() {
  return src(['app/html/*.html']) // Находит любой .html файл в папке "html", куда будем подключать другие .html файлы													
  .pipe(fileInclude({
    prefix: '@',
    basepath: '@file',
  }))
  .pipe(dest('app')) // указываем, в какую папку поместить готовый файл html
  .pipe(browserSync.stream());
}


function styles() {
  return src('app/scss/style.scss')
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function scripts(){
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'app/js/main.js'
    ])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function watching() {
  watch(['app/scss/**/*.scss'], styles);
  watch(['app/js/main.js'], scripts);
  watch(['app/**/*.html']).on('change', browserSync.reload);
  watch(['app/html/**/*.html'], htmlInclude);
}

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.htmlInclude = htmlInclude;

exports.default = parallel(htmlInclude,styles,scripts,browsersync,watching);