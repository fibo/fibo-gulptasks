# fibo-gulptasks

> common gulp tasks among projects

[![Build Status](https://travis-ci.org//fibo-gulptasks.png?branch=master)](https://travis-ci.org//fibo-gulptasks.png?branch=master) [![NPM version](https://badge.fury.io/js/fibo-gulptasks.png)](http://badge.fury.io/js/fibo-gulptasks) [![Dependency Status](https://gemnasium.com//fibo-gulptasks.png)](https://gemnasium.com//fibo-gulptasks) [![Stories in Ready](https://badge.waffle.io//fibo-gulptasks.png?label=ready&title=Ready)](https://waffle.io//fibo-gulptasks)

# Installation

Install packages

```bash
$ npm install -g gulp
$ npm install --save-dev gulp fibo-gulptasks
```

Then create a *gulpfile.js*

```bash
$ cat <<EOF > gulpfile.js

var gulp = require('gulp')
  , pkg  = require('./package.json')

require('fibo-gulptasks')(gulp, pkg)

EOF
```

# License

[MIT](http://fibo.mit-license.org/)

