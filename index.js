
process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log(err);
});

var gmocha = require('gulp-mocha')
  , mkdirp = require('mkdirp')
  , path   = require('path')
  , exec   = require('child_process').exec

// rootDir does not depend on package name
var rootDir = path.join('node_modules', require('./package.json').name , 'root')

module.exports = function (gulp) {

  gulp.task('mkdirs', function () {
    [
      'classes'
    , 'docs/out'
    , 'docs/src/layouts'
    , 'docs/src/partials'
    ].forEach(function (dir) { mkdirp(dir) })
  })

  gulp.task('.jshintrc', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, '.jshintrc')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
  })

  gulp.task('.travis.yml', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, '.travis.yml')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
  })

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(gmocha({reporter: 'list'}))
  })

  gulp.task('npm:install', function () {
    var child = exec('npm install mocha --save-dev').stderr.pipe(process.stderr)
  })

  gulp.task('default', ['test'])

  gulp.task('scaffold', ['mkdirs', '.jshintrc', '.travis.yml'])
}

