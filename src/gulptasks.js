
var dox      = require('dox')
  , exec     = require('child_process').exec
  , fs       = require('fs')
  , gmocha   = require('gulp-mocha')
  , gutil    = require('gulp-util')
  , jshint   = require('gulp-jshint')
  , mdconf   = require('mdconf')
  , mkdirp   = require('mkdirp')
  , path     = require('path')
  , template = require('gulp-template')
  , thisPkg  = require('../package.json')

/*!
 * Relative paths
 */

var baseDir = path.join(__dirname, '..')
var configMd  = path.join(baseDir , 'config.md')
  , rootDir   = path.join(baseDir , 'root')

var config = mdconfFromFile(configMd).config

var readmeContentPath = 'readmeContent.md'

/**
 *
 * @param {Object} gulp
 * @param {String} filename
 * @api private
 */

function createTaskCopyFile (gulp, fileName) {
  gulp.task(fileName, function () {
     var dest = path.dirname(fileName)
       , src  = path.join(rootDir, fileName)

     gutil.log('copy ' + src + ' -> ' + dest)

     return gulp.src(src)
                .pipe(gulp.dest(dest))
  })
}

/**
 * Generates a file, use instead of *createTaskCopyFile* if file has a special
 * meaning, like *.npmignore* and *.gitignore* and it cannot be stored as a raw file.
 * Files will not be overwritten.
 *
 * @param {Object} gulp
 * @param {String} fileName
 * @param {Array} rows file content
 * @api private
t
t
 */

function createTaskGenerateIgnoreFile (gulp, fileName, rows) {
  if (fs.existsSync(fileName))
    gulp.task(fileName, [])
  else
    gulp.task(fileName, function () {
      var footer = ['# end of', thisPkg.name, 'stuff'].join(' ') .concat("\n")
        , header = ['# generated by', thisPkg.name, thisPkg.version].join(' ')

      var content = [header, rows.join("\n"), footer].join("\n")

      fs.writeFileSync(fileName, content, {encoding: 'utf8'})
    })
}

/**
 *
 * @param {Object} gulp
 * @param {String} fileName
 * @param {Object} templateData
 * @api private
 */

function createTaskRenderTemplate (gulp, fileName, templateData) {
  gulp.task(fileName, function () {
     var dest = path.dirname(fileName)
       , src  = path.join(rootDir, fileName)

     gutil.log('render ' + src + ' -> ' + dest)

     return gulp.src(src)
                .pipe(template(templateData))
                .pipe(gulp.dest(dest))
  })
}

/**
 * Copies a file **only** if it does not exists.
 *
 * @param {Object} gulp
 * @param {String} fileName
 * @api private
 */

function createTaskTouchFile (gulp, fileName) {
  // Create an empty task if fileName already exists
  if (fs.existsSync(fileName))
    gulp.task(fileName, [])
  else
    createTaskCopyFile(gulp, fileName)
}

/**
 *
 * @param source {String} /path/to/input/file.js
 * @return doxObj {Object}
 * @api private
 */

function doxParse (source) {
  var fileContent

  gutil.log('doxParse ' + source)

  try {
    fileContent = fs.readFileSync(source, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  var doxOptions = {debug: false, raw: true}

  var doxObj = dox.parseComments(fileContent, doxOptions)

  return doxObj
}

/*
 * Executes given command as a child
 *
 * ```
 * execCommand('npm install')()
 * ```
 *
 * @api private
 * @param {String} command
 * @return {Function} execChild
 */

function execCommand(command) {
  return function execChild() {
    var child = exec(command)

    gutil.log(command)

    child.stderr.pipe(process.stderr)
  }
}

/**
 *  Read configuration parameters from markdown file
 *
 * @param fileName {String} /path/to/file.md
 * @api private
 */

function mdconfFromFile (fileName) {
  var fileContent

  try {
    fileContent = fs.readFileSync(fileName, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  return mdconf(fileContent)
}

/**
 * Create gulp tasks
 *
 * @param {Object} gulp
 * @param {Object} pkg object from package.json
 */

function gulptasks (gulp, pkg) {
  gulp.task('config', function () {
    console.log(JSON.stringify(config, null, 4))
  })

  config.tasks.copyfiles.forEach(function (fileName) {
    createTaskCopyFile(gulp, fileName)
  })

  gulp.task('copyfiles', config.tasks.copyfiles)

  gulp.task('docs', config.tasks.docs)

  gulp.task('dox', function () {
    var conf    = config.tasks.dox
      , doxData = {}
      , srcDir  = 'src'

    var files = fs.readdirSync(srcDir)

    files.forEach(function (fileName) {
      // ignore index.js
      if (fileName === 'index.js')
        return

      // All input files should have extension .js
      var source = path.join(srcDir, fileName)
      var item = path.basename(fileName, '.js')

      var doxObj = doxParse(source)
      doxData[item] = doxObj
    })

    try {
      mkdirp(path.dirname(conf.outputfile))
      fs.writeFileSync(conf.outputfile, JSON.stringify(doxData, null, 4), {encoding: 'utf8'})
    }
    catch (err) { throw err }
  })

  gulp.task('default', config.tasks.default)

  gulp.task('generatefiles', config.tasks.generatefiles)

  createTaskGenerateIgnoreFile(gulp, 'gitignore', config.tasks['gitignore'])

  gulp.task('jshint', function () {
    gulp.src('src/*js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
  })

  gulp.task('mkdirs', function () {
    config.tasks.mkdirs.forEach(function (dir) { mkdirp(dir) })
  })

  createTaskGenerateIgnoreFile(gulp, 'npmignore', config.tasks['npmignore'])

  gulp.task('npminstall', function () {
    execCommand('npm install')()
  })

  gulp.task('packagejson', function () {
    var conf = config.tasks['packagejson']

    pkg.devDependencies = conf.devdependecies

    pkg.homepage = 'http://www.g14n.info/' + pkg.name

    pkg.license = [ conf.license ]

    pkg.scripts.test = conf.scripts.test

    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2), {encoding: 'utf8'})
  })

  var renderTemplatesConf = config.tasks.rendertemplates
    , renderTemplatesDeps = ['copyfiles', 'touchfiles']

  renderTemplatesConf.forEach(function (element) {
    renderTemplatesDeps.push(element)
  })

  renderTemplatesConf.forEach(function (fileName) {
    var templateData = {
      pkg: pkg
    , readmeContent: '**TODO:** edit file ' + readmeContentPath
    , readmeContentPath: readmeContentPath
    }

    fs.readFile(readmeContentPath, {encoding: 'utf8'}, function (err, data) {
      if (!err)
        templateData.readmeContent = data
    })

    createTaskRenderTemplate(gulp, fileName, templateData)
  })

  gulp.task('rendertemplates', renderTemplatesDeps)

  gulp.task('scaffold', config.tasks.scaffold)

  gulp.task('test', function () {
    var conf = config.tasks.test

    gulp.src('test/*js')
        .pipe(gmocha({reporter: conf.reporter}))
  })

  config.tasks.touchfiles.forEach(function (fileName) {
    createTaskTouchFile(gulp, fileName)
  })

  gulp.task('touchfiles', config.tasks.touchfiles)
}

/*!
 * Export
 */

module.exports = gulptasks

