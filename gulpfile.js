var gulp = require('gulp');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var buildBranch = require('buildbranch');

gulp.task('default', ['html']);

var skipUglify = function(file) {
     if (file.path.match(/data.js/)) {
         return false
     } else if (file.path.match(/.js/)) {
         return true
     }
}

gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('index.html')
        .pipe(assets)
        .pipe(gulpif(skipUglify, uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('../addMenu_creator-gh-pages'));
});

gulp.task('publish', ['html'], function(done) {
  buildBranch({ folder: 'dist' }, done);
});