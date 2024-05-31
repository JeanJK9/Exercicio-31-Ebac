const {series, parallel} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-image')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('node-sass'))
const reload = browserSync.reload

function tarefasSASS(cb) {

    gulp.src('./src/scss/**/*.scss')
     .pipe(sass())
     .pipe(cssmin())
     .pipe(gulp.dest('./dist/css'))

    return cb()
}

function tarefasImagem(){
    
    return gulp.src('./src/assets/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))

    return callback()    
}

gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) 
    gulp.watch('./dist/**/*').on('change', reload)  
})

function end(cb) { 
    console.log("tarefas concluidas")
    return cb()
 }

const process = gulp.series( tarefasHTML, tarefasSASS, end)

exports.images = tarefasImagem
exports.sass = tarefasSASS


exports.default = process