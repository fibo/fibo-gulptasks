fibo-gulptasks
==============

common gulp tasks among projects

# Install

Install packages

```bash
npm install -g gulp
npm install --save-dev gulp gulp-util
npm install --save-dev git://github.com/fibo/fibo-gulptasks.git
```

Then create a *gulpfile.js* like this

```js
var gulp = require('gulp')

require('fibo-gulptasks')(gulp)
```

