# fibo-gulptasks

> common gulp tasks among projects

[![Build Status](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master)](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master) [![Dependency Status](https://gemnasium.com/fibo/fibo-gulptasks.png)](https://gemnasium.com/fibo/fibo-gulptasks)

![tasks-flow!](http://www.g14n.info/fibo-gulptasks/img/tasks-flow.png)

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

# Development

Install [fibo/fibo-gulptasks][1] for development tasks automation.

# License

[MIT][2]

[1]: https://github.com/fibo/fibo-gulptasks
[2]: http://fibo.mit-license.org/

