
var exec    = require('child_process').exec
  , fs      = require('fs')
  , gmocha  = require('gulp-mocha')
  , gutil   = require('gulp-util')
  , mdconf  = require('mdconf')
  , mkdirp  = require('mkdirp')
  , path    = require('path')
  , thisPkg = require('./package.json')

var thisPkgName = thisPkg.name

/*
 * Paths relative to baseDir
 */

// baseDir does not depend on current package name
var baseDir = path.join('node_modules', thisPkgName)

var configMd  = path.join(baseDir , 'config.md')
  , rootDir   = path.join(baseDir , 'root')

var config = mdconfFromFile(configMd).config

function mdconfFromFile (filename) {
  try {
    var fileContent = fs.readFileSync(filename, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  return mdconf(fileContent)
}

function npmInstall (packageName, flag) {
  var npmCommand = 'npm install ' + packageName + flag
    , child      = exec(npmCommand)

  gutil.log(npmCommand)

  child.stderr.pipe(process.stderr)
}

function npmInstallDevDependency (packageName) {
  npmInstall(packageName, ' --save-dev')
}

function npmInstallGlobal (packageName) {
  npmInstall(packageName, ' -g')
}

module.exports = function (gulp) {

  gulp.task('mkdirs', function () {
    config.tasks.mkdirs.folders.forEach(function (dir) { mkdirp(dir) })
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

  gulp.task('index.js', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, 'index.js')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
  })

  gulp.task('test', function () {
    gulp.src('test/*js')
        .pipe(gmocha({reporter: 'list'}))
  })

  gulp.task('npm:install', function () {
    var conf = config.tasks['npm:install']

    conf.dev.forEach(npmInstallDevDependency)
    conf.global.forEach(npmInstallGlobal)
  })

  gulp.task('config', function () {
    console.log(JSON.stringify(config, null, 4))
  })

  gulp.task('default', config.tasks.default)

  gulp.task('scaffold', config.tasks.scaffold)
}

