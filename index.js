
var mkdirp = require('mkdirp')
  , mocha = require('gulp-mocha')

module.exports = function (gulp) {

  gulp.task('docs', function () {
    mkdirp('docs/src/layouts')
  })

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(mocha({reporter: 'nyan'}))
  })

  gulp.task('default', ['test'])
}

