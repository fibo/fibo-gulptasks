
var base = './node_modules/fibo-gulpfiles/root'

var mkdirp = require('mkdirp')
  , mocha  = require('gulp-mocha')

module.exports = function (gulp) {

  gulp.task('mkdirs', function () {
    mkdirp('docs/src/layouts')
  })

  gulp.task('.jshintrc', function () {
    gulp.src('.jshintrc', {base: base})
        .pipe(gulp.dest('.'))
  })

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(mocha({reporter: 'nyan'}))
  })

  gulp.task('default', ['test'])
}

