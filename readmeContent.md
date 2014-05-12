# Installation

Install packages

```bash
$ npm install -g gulp
$ npm install --save-dev fibo/fibo-gulptasks
$ npm install --save-dev fibo-gulptasks
```

Then create a *gulpfile.js*

```bash
$ cat <<EOF > gulpfile.js

var gulp = require('gulp')
  , pkg  = require('./package.json')

require('fibo-gulptasks')(gulp, pkg)

EOF
```

# Configuration

Config is stored in *config.md* file, you can see it in JSON format launching

```bash
gulp config
```

# Scaffolding

`fibo-gulptasks` generates files and folders by copying, touching or rendering templates.
Almost all the content is taken from the *root/* folder.

| file                               | task                                                                                                      | note                            |
|------------------------------------|-----------------------------------------------------------------------------------------------------------|---------------------------------|
|.gitignore                          |[gitignore](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#gitignore)                       | |
|.npmignore                          |[npmignore](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#npmignore)                       | |
|.jshintrc                           |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|.travis.yml                         |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|docs/docpad.coffee                  |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|docs/package.json                   |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|docs/src/documents/index.html.md    |[rendertemplates](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#rendertemplates)            |source is *readmeContent.md* file|
|docs/src/documents/api.html.eco     |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|docs/src/documents/spec.html.eco    |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|docs/src/layouts/default.html.eco   |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|gulpfile.js                         |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|index.js                            |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |
|package.json                        |[packagejson](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#packagejson)                   |some attributes are overwritten  |
|README.md                           |[rendertemplates](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#rendertemplates)            |source is *readmeContent.md* file|
|test/require.js                     |[copyfiles](https://github.com/fibo/fibo-gulptasks/blob/master/config.md#copyfiles)                        | |

```bash
$ npm install fibo/fibo-gulptasks
```

