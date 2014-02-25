# fibo-gulptasks

> common gulp tasks among projects

[![Build Status](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master)](https://travis-ci.org/fibo/fibo-gulptasks.png?branch=master) [![NPM version](https://badge.fury.io/js/fibo-gulptasks.png)](http://badge.fury.io/js/fibo-gulptasks)

---
layout: 'default'
---

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

