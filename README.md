# fibo-gulptasks

> common gulp tasks among projects

[![Build Status](https://travis-ci.org/[object Object]/fibo-gulptasks.png?branch=master)](https://travis-ci.org/[object Object]/fibo-gulptasks.png?branch=master) [![Dependency Status](https://gemnasium.com/[object Object]/fibo-gulptasks.png)](https://gemnasium.com/[object Object]/fibo-gulptasks)

# Installation

With [npm](https://npmjs.org/) do

```bash
$ npm install -g gulp
$ npm install --save-dev gulp
$ npm install fibo/fibo-gulptasks
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

