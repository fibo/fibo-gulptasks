
var gulp = require('gulp')
  , pkg  = require('./package.json')

// use this module to develop itself
require('./index')(gulp, pkg)

