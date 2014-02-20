
var dox     = require('dox')
  , exec    = require('child_process').exec
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

/**
 *
 * @param source {String} /path/to/input/file.js
 * @param target {String} /path/to/output/file.json
 */

function doxParse(source, target) {
  gutil.log('doxParse ' + source + ' -> ' + target)

  try {
    var fileContent = fs.readFileSync(source, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  var doxOptions = {debug: false, raw: true}

  var obj = dox.parseComments(fileContent, doxOptions)

  try {
    fs.writeFileSync(target, JSON.stringify(obj, null, 4), {encoding: 'utf8'})
  }
  catch (err) { throw err }
}

/**
 *
 * @param fileName {String} /path/to/file.md
 */

function mdconfFromFile (fileName) {
  try {
    var fileContent = fs.readFileSync(fileName, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  return mdconf(fileContent)
}

/**
 *
 * @param packageName {String}
 * @param flag {String} npm install option flag
 */

function npmInstall (packageName, flag) {
  var npmCommand = 'npm install ' + packageName + flag
    , child      = exec(npmCommand)

  gutil.log(npmCommand)

  child.stderr.pipe(process.stderr)
}

/**
 *
 * @param packageName {String}
 * @api private
 */

function npmInstallDevDependency (packageName) {
  npmInstall(packageName, ' --save-dev')
}

/**
 *
 * @param packageName {String}
 * @api private
 */

function npmInstallGlobal (packageName) {
  npmInstall(packageName, ' -g')
}

/**
 *
 * @param gulp {Object}
 * @param fileName {String}
 * @api private
 */

function createTaskCopyFile (gulp, fileName) {
  gulp.task(fileName, function () {
     var dest = fileName // path.dirname(fileName)
       , src  = path.join(rootDir, fileName)

     gutil.log('copy ' + src + ' -> ' + dest)

     return gulp.src(src)
                .pipe(gulp.dest(dest))
  })
}

module.exports = function (gulp) {

  gulp.task('.npmignore', function () {
    var destPath = './'
      , srcPath  = path.join(rootDir, '.npmignore')

    gulp.src(srcPath)
        .pipe(gulp.dest(destPath))
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

  gulp.task('config', function () {
    console.log(JSON.stringify(config, null, 4))
  })

  gulp.task('docs', config.tasks.docs)

  gulp.task('dox', function () {
    var conf   = config.tasks.dox
      , source
      , srcDir = 'src'
      , target

    var files = fs.readdirSync(srcDir)

    files.forEach(function (fileName) {
      // ignore index
      if (fileName === 'index.js')
        return

      // All input files should have extension .js, so adding 'on' to fileName
      // turns their extension in .json, LOL!
      target = path.join(conf.targetdir, fileName + 'on')
      source = path.join(srcDir, fileName)

      doxParse(source, target)
    })
  })

  gulp.task('default', config.tasks.default)

  gulp.task('mkdirs', function () {
    mkdirp(config.tasks.dox.targetdir)

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

  config.tasks.staticfiles.forEach(function (fileName) {
    createTaskCopyFile(gulp, fileName)
  })

  gulp.task('staticfiles', config.tasks.staticfiles)

  gulp.task('test', function () {
    var conf = config.tasks.test

    gulp.src('test/*js')
        .pipe(gmocha({reporter: conf.reporter}))
  })

}

