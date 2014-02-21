
var pkg = require('../package.json')

var docpadConfig = {
  templateData = {
    site: {
      description: pkg.description
    , title:       pkg.name
    , keywords:    pkg.keywords
    }
  }
}

module.exports = docpadConfig

