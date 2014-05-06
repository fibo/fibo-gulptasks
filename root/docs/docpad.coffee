# DocPad Configuration File
# http://docpad.org/docs/config

fs = require('fs')
path = require('path')

pkg = require('../package.json')

#gulptasks = require('./src/files/json/dox/gulptasks.json')

dox = {}
doxDir = './src/files/json/dox'

fs.readdir doxDir, (err, files) ->
  for file in files
    console.log(file)
    objName = path.basename(file, '.json')
    objPath = path.join(baseDir, file)
    #objData = require(objPath)
    console.log(objName)
    dox.objName = objData

#dox.gulptasks = gulptasks

docpadConfig = {
  templateData: {
    dox: dox
    pkg: pkg
    bootstrap: {
      cdn: '//netdna.bootstrapcdn.com/bootstrap/3.1.1'
    }
  }
}

module.exports = docpadConfig

