# fibo-gulptasks

> common gulp tasks among projects

[![Build Status](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master)](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master) [![NPM version](https://badge.fury.io/js/fibo-gulptasks.png)](http://badge.fury.io/js/fibo-gulptasks)

# Installation

Install packages

```bash
npm install -g gulp
npm install --save-dev gulp fibo-gulptasks
```

Then create a *gulpfile.js*

```bash
cat <<EOF > gulpfile.js

var gulp = require('gulp')

require('fibo-gulptasks')(gulp)

EOF
```

# Configuration

Config is stored in *config.md* file, you can see it in JSON format launching

```bash
gulp config
```

# Scaffolding

`fibo-gulptasks` generates files and folders by copying, touching or rendering templates.
Almost all the content is taken from the *root/* folder

|file                                |task                  |note|
|------------------------------------|----------------------|----|
|.jshintrc                           | | |
|.travis.yml                         | | |
|docs/docpad.coffee                  | | |
|docs/out/.gitignore                 | | |
|docs/package.json                   | | |
|docs/src/documents/index.html.md    |rendertemplates       |source is *readmeContent.md* file|
|docs/src/layouts/default.html.eco   | | |
|docs/src/partials/analytics.html.eco| | |
|docs/src/partials/method.html.eco   | | |
|gulpfile.js                         | | |
|index.js                            | | |
|package.json                        |overwrite:package.json|some attributes are overwritten
|README.md                           |rendertemplates       |source is *readmeContent.md* file|
|test/require.js                     | | |

# Development

Yep, this module depend on itself. To avoid npm complain

```
$ npm install --save-dev fibo-gulptasks
Refusing to install fibo-gulptasks as a dependency of itself
```

install from GitHub instead, without saving

```
$ npm install fibo/fibo-gulptasks
```



# License

[MIT](http://fibo.mit-license.org/)

