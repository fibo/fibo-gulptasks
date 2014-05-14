
var _         = require('lodash')
  , dox       = require('dox')
  , exec      = require('child_process').exec
  , fs        = require('fs')
  , gconnect  = require('gulp-connect')
  , jshint    = require('gulp-jshint')
  , gmocha    = require('gulp-mocha')
  , gtemplate = require('gulp-template')
  , gutil     = require('gulp-util')
  , marked   = require('marked')
  , mdconf    = require('mdconf')
  , mkdirp    = require('mkdirp')
  , path      = require('path')
  , thisPkg   = require('../package.json')

var baseDir = path.join(__dirname, '..')

var configMd = path.join(baseDir , 'config.md')
  , configMdContent = readFileContent(configMd)
  , rootDir  = path.join(baseDir , 'root')

var config = mdconf(configMdContent).config

/* Generate *ignore* files
 *
 * Use instead of *createTaskGenerateFile* cause *.npmignore* and *.gitignore* 
 * cannot be stored as raw files.
 *
 * Files will not be overwritten.
 *
 * @api private
 * @param {Object} gulp
 * @param {String} taskName
 * @param {Array} rows file content
 */

function createTaskGenerateIgnoreFile (gulp, taskName, rows) {
  var fileName = '.' + taskName

  if (fs.existsSync(fileName))
    gulp.task(taskName, [])
  else
    gulp.task(taskName, function () {
      var footer = ['# end of', thisPkg.name, 'stuff'].join(' ') .concat("\n")
        , header = ['# generated by', thisPkg.name, thisPkg.version].join(' ')

      var content = [header, rows.join("\n"), footer].join("\n")

      writeFileContent(fileName, content)
    })
}

/* Render files from template
 * @api private
 * @param {Object} gulp
 * @param {String} taskName
 * @param {String} fileName
 * @param {Object} pkg
 * @param {Object} config
 * @param {Bool} touch do not overwrite file
 */

function createTaskGenerateFile (gulp, fileName, pkg, config, touch) {
  // Create an empty task if fileName already exists
  if (touch && fs.existsSync(fileName))
    return gulp.task(fileName, [])

  var taskName = fileName
    , templateData = {
        bootstrap: {
          cdn: '//netdna.bootstrapcdn.com/bootstrap/3.1.1/'
        }
      , dox: {}
      , document : {}
      , docs: {}
      , pkg: pkg
      , readme: {}
      }

  // TODO il README potrebbe essere ancora non generato, metti a posto usando functional javascript e togli tutti i Sync
  if (fs.existsSync('./README.md'))
    templateData.readme.md = readFileContent('./README.md')
  else
    templateData.readme.md = _.template(readFileContent(path.join(rootDir, 'README.md')), templateData)

  templateData.readme.html = marked(templateData.readme.md)

  templateData.docs.header = _.template(readFileContent(path.join(rootDir, 'docs', '_header.html')), templateData)
  templateData.docs.footer = _.template(readFileContent(path.join(rootDir, 'docs', '_footer.html')), templateData)

  if (fs.existsSync(config.tasks.dox.outputfile))
    templateData.dox = JSON.parse(readFileContent(config.tasks.dox.outputfile))

  templateData.document.basename = path.basename(fileName)

  gulp.task(taskName, function () {
     var dest = path.dirname(fileName)
       , src  = path.join(rootDir, fileName)

     gutil.log('file ' + fileName)

     return gulp.src(src)
                .pipe(gtemplate(templateData))
                .pipe(gulp.dest(dest))
  })
}

/* Get content from file
 *
 * @api private
 * @param {String} path
 * @return {String} fileContent
 */

function readFileContent (path) {
  var fileContent

  try {
    fileContent = fs.readFileSync(path, {encoding: 'utf8'})
  }
  catch (err) { throw err }

  return fileContent
}

/* Write content to file
 *
 * @api private
 * @param {String} filePath
 * @param {String} fileContent
 */

function writeFileContent (filePath, fileContent) {
    try {
      mkdirp(path.dirname(filePath))
      fs.writeFileSync(filePath, fileContent, {encoding: 'utf8'})
    }
    catch (err) { throw err }
}

/* Parse source comments with dox
 *
 * @api private
 * @param {String} source /path/to/input/file.js
 * @return {Object} doxObj
 */

function doxParse (source) {
  gutil.log('doxParse ' + source)

  var doxObj
    , doxOptions = {debug: false, raw: true}
    , fileContent = readFileContent(source)

  doxObj = dox.parseComments(fileContent, doxOptions)

  return doxObj
}

/*
 * Executes given command
 *
 * ```
 * execCommand('npm install')()
 * ```
 *
 * @api private
 * @param {String} command
 * @return {Function} execChild
 */

function execCommand (command) {
  return function execChild () {
    var child = exec(command)

    gutil.log(command)

    child.stderr.pipe(process.stderr)
    child.stdout.pipe(process.stdout)
  }
}

/* Create gulp tasks
 *
 * @param {Object} gulp
 * @param {Object} pkg object from package.json
 */

function gulptasks (gulp, pkg) {
  gulp.task('docsreload', function (next) {
     gulp.src(config.tasks.watch.docs.glob)
         .pipe(gconnect.reload())
  })

  gulp.task('docsserver', function (next) {
    var conf = config.tasks.docsserver

    gconnect.server({
      root: conf.root,
      livereload: true
    })
  })

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

    writeFileContent(conf.outputfile, JSON.stringify(doxData, null, 4))
  })

  gulp.task('default', config.tasks.default)

  gulp.task('dev', config.tasks.dev.deps)

  config.tasks.generatefiles.touch.forEach(function (fileName) {
    createTaskGenerateFile(gulp, fileName, pkg, config, true)
  })

  config.tasks.generatefiles.overwrite.forEach(function (fileName) {
    createTaskGenerateFile(gulp, fileName, pkg, config, false)
  })

  gulp.task('generatefiles', config.tasks.generatefiles.touch.concat(config.tasks.generatefiles.overwrite))

  gulp.task('generateignorefiles', config.tasks.generateignorefiles.deps)

  createTaskGenerateIgnoreFile(gulp, 'gitignore', config.tasks.gitignore)

  gulp.task('gitpull', execCommand(config.tasks.gitpull))

  gulp.task('gitpush', execCommand(config.tasks.gitpush))

  gulp.task('jshint', function () {
    gulp.src('src/*js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
  })

  gulp.task('mocha', function () {
    var conf = config.tasks.mocha

    gulp.src('test/*js')
        .pipe(gmocha({reporter: conf.reporter}))
  })

  createTaskGenerateIgnoreFile(gulp, 'npmignore', config.tasks.npmignore)

  gulp.task('npminstall', execCommand(config.tasks.npminstall))

  gulp.task('packagejson', function () {
    var conf = config.tasks.packagejson

    pkg.devDependencies = conf.devdependecies

    pkg.homepage = 'http://www.g14n.info/' + pkg.name

    pkg.license = [ conf.license ]

    pkg.scripts.test = conf.scripts.test

    writeFileContent('./package.json', JSON.stringify(pkg, null, 2))
  })

  gulp.task('scaffold', config.tasks.scaffold)

  gulp.task('setup', config.tasks.setup.deps)

  gulp.task('test', config.tasks.test.deps)

  gulp.task('watch', function () {
    var conf = config.tasks.watch

    function logFileChanged (event) {
      gutil.log('File '+event.path+' was '+event.type+', running tasks...')
    }

    gulp.watch(conf.docs.glob, conf.docs.tasks)
        .on('change', logFileChanged)

    gulp.watch(conf.readme.glob, conf.readme.tasks)
        .on('change', logFileChanged)

    gulp.watch(conf.src.glob, conf.src.tasks)
        .on('change', logFileChanged)
  })
}

module.exports = gulptasks

