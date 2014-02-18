
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

function doxParse(source, target) {
  var child = exec('dox')

  try {
    var fileContent = fs.readFileSync(source, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  child.stdin.write(fileContent)

  child.stdout.on('data', function (json) { console.log(json) })

  child.stdin.end()
}

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

  gulp.task('config', function () {
    console.log(JSON.stringify(config, null, 4))
  })

  gulp.task('dox', function () {
    var conf = config.tasks.dox

    var source = 'test/foo.js'
      , target = 'docs/src/files/json/dox/foo.json'

    doxParse(source, target)
  })

  gulp.task('default', config.tasks.default)

  gulp.task('mkdirs', function () {
    config.tasks.mkdirs.forEach(function (dir) { mkdirp(dir) })
  })

  gulp.task('index.js', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, 'index.js')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
  })

  gulp.task('npm:install', function () {
    var conf = config.tasks['npm:install']

    conf.dev.forEach(npmInstallDevDependency)
    conf.global.forEach(npmInstallGlobal)
  })

  gulp.task('scaffold', config.tasks.scaffold)

  gulp.task('test', function () {
    var conf = config.tasks.test

    gulp.src('test/*js')
        .pipe(gmocha({reporter: conf.reporter}))
  })

}

