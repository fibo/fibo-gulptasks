
var mocha = require('gulp-mocha')

module.exports = function (gulp) {

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(mocha({reporter: 'nyan'}))
  }

  gulp.task('hello', function () {
    console.log('hello)
  })

  gulp.task('default', ['hello'])
}

