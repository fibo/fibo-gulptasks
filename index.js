
var gmocha = require('gulp-mocha')
  , mkdirp = require('mkdirp')
  , path   = require('path')
  , pkg    = require('./package.json')

var scrDir = path.join('node_modules', pkg.name, 'root')

module.exports = function (gulp) {

  gulp.task('mkdirs', function () {
    [
      'classes'
    , 'docs/out'
    , 'docs/src/layouts'
    ].forEach(function (dir) { mkdirp(dir) })
  })

  gulp.task('.jshintrc', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, '.jshintrc')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
  })

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(mocha({reporter: 'nyan'}))
  })

  gulp.task('default', ['test'])

  gulp.task('scaffold', ['mkdirs', '.jshintrc'])
}

