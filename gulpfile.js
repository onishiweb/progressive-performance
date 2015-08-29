var gulp        = require('gulp'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload,
    pngquant    = require('imagemin-pngquant'),
    critical    = require('critical'),
    penthouse   = require('penthouse'),
    fs          = require('fs'),
    deploy      = require('gulp-gh-pages'),
    $           = require('gulp-load-plugins')({
                    rename: {
                        'gulp-minify-html': 'minifyHTML',
                        'gulp-minify-css': 'cssmin'
                    }
                  });

gulp.task('scss', function() {
    var onError = function(err) {
            $.notify.onError({
                title:    "Gulp",
                subtitle: "Failure!",
                message:  "Error: <%= error.message %>",
                sound:    "Beep"
          })(err);

      this.emit('end');
  };

    return gulp.src('assets/scss/main.scss')
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sass())
        .pipe($.size({ gzip: true, showFiles: true }))
        .pipe($.autoprefixer())
        .pipe($.rename('main.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream:true}))
        .pipe($.cssmin())
        .pipe($.size({ gzip: true, showFiles: true }))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "public/"
        }
    });
});

gulp.task('deploy', function () {
    return gulp.src('public/**/*')
        .pipe(deploy());
});

gulp.task('js', function() {
    gulp.src('assets/js/*.js')
        .pipe($.uglify())
        .pipe($.size({ gzip: true, showFiles: true }))
        .pipe($.concat('j.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(reload({stream:true}));
});

gulp.task('scss-lint', function() {
  gulp.src('assets/scss/**/*.scss')
    .pipe($.cache('scsslint'))
    .pipe($.scsslint());
});

gulp.task('jshint', function() {
    gulp.src('assets/js/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/**/*.scss', ['scss']);
  gulp.watch('assets/js/*.js', ['jshint', 'js']);
  gulp.watch('assets/img/*', ['imgmin']);
});

gulp.task('imgmin', function () {
    return gulp.src('assets/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('browserify', function () {

    gulp.src(['js/main.js'])
        .pipe($.browserify({
            debug: true,
            transform: [ 'reactify' ]
        }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('critical', function () {
    penthouse({
        url : 'http://localhost:4444/index.html',
        css : 'public/styles.css',
        width : 720,   // viewport width
        height : 500   // viewport height
    }, function(err, criticalCss) {
        if (err) { 
            // handle error 
            console.log('error', err);
        }
        fs.writeFileSync('public/critical.css', criticalCss);
    });
});

gulp.task('build', ['js', 'imgmin', 'scss', 'browserify']);

gulp.task('default', ['browser-sync', 'js', 'imgmin', 'scss', 'watch']);
