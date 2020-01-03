const ngrok = require('ngrok');
const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default // to overcome the ES6 syntax;
const sass = require("gulp-sass");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');

// browserify to use in the build mode because it allows to minify with uglify
const browserify = require("browserify");

// browserify module to use in the dev mode 
const gulpBrowserify = require("gulp-browserify");

// modules to minify with uglify and browserify
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');




// -------------------------------------------- 1.gulp dev mode -----------------------------------------------------------
gulp.task("sassDev", function(){
    // in order to use sass in gulp with partial scss, it needs to create partial(file with underscore) and import it in a main scss file
    // without underscore. Underscore in gulp sass it won't let to compile the scss file.
    return gulp.src("../digitalism/src/sass/**/*.scss")
    .pipe(sass())
    // 3. add autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    // 4. where to save it
    .pipe(gulp.dest('../digitalism'))
})

// Task to import js module into one main js file
gulp.task("jsDev", function(){
    return gulp.src("../digitalism/src/js/*.js")
    .pipe(gulpBrowserify({debug: true}))
    .pipe(gulp.dest("../digitalism/dev"))
})

gulp.task("dev", gulp.series("sassDev", "jsDev"))


// Task to minify imgs
gulp.task("imgMin", function(){
    return gulp.src("../digitalism/src/img/*")
           .pipe(imagemin())
           .pipe(gulp.dest("../digitalism/dist/img"))
})


gulp.task("watch", function(){
    browserSync.init({
        proxy: "http://localhost/web-media",
    })
    
    gulp.watch('../digitalism/*.php').on('change', browserSync.reload);
    gulp.watch("../digitalism/src/js/*.js", gulp.series( "jsDev")).on('change', browserSync.reload)
    gulp.watch("../digitalism/src/sass/**/*.scss", gulp.series( "sassDev")).on('change', browserSync.reload)
    gulp.watch("../digitalism/src/img/*", gulp.series( "imgMin")).on('change', browserSync.reload)
})



// -------------------------------------------- 2.gulp production mode ----------------------------------------------------
gulp.task("sassDist", function(){
    // in order to use sass in gulp with partial scss, it needs to create partial(file with underscore) and import it in a main scss file
    // without underscore. Underscore in gulp sass it won't let to compile the scss file.
    return gulp.src("../digitalism/src/sass/**/*.scss")
    .pipe(sass())
    // 3. add autoprefixer
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
    // 4. add minification
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // 5. where to save it
    .pipe(gulp.dest('../digitalism'))
})

// Task to minify JS file
gulp.task("jsDist", function(){
    return browserify('../digitalism/src/js/index.js')
    .bundle()
    .pipe(source('index.js')) // gives streaming vinyl file object
    .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
    .pipe(uglify()) // now gulp-uglify works 
    .pipe(gulp.dest('../digitalism/dist'));
})

gulp.task("build", gulp.series("sassDist","jsDist"))
