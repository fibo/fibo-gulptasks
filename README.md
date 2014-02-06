fibo-gulptasks
==============

common gulp tasks among projects

## Installation

Install packages

```bash
npm install -g gulp
npm install --save-dev gulp gulp-util
npm install --save-dev git+ssh://git@github.com/fibo/fibo-gulptasks.git
```

Then create a *gulpfile.js*

```bash
cat <<EOF > gulpfile.js

var gulp = require('gulp')

require('fibo-gulptasks')(gulp)

EOF
```

## Configuration

Config is stored in *config.md* file, you can see it in JSON format launching

```bash
gulp config
```

