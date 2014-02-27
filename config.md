
# config

## Tasks

### .gitignore

Generates a *.gitignore* file with the following content

  * *~
  * node_modules
  * npm-debug.log

Note that this task is treated a part and not in *copyfiles* cause adding a 
*.gitignore* in the *root/* folder will tell git to ignore such files.

Existing *.gitignore* file will not be overwritten.

### .npmignore

Generates a *.npmignore* file with the following content

  * .travis.yml
  * .jshintrc
  * docs/
  * gulpfile.js

Note that this task is treated a part and not in *copyfiles* cause adding a 
*.npmignore* in the *root/* folder will tell npm to ignore such files.

Existing *.npmignore* file will not be overwritten.

### copyfiles

Copies the following files

  * .jshintrc
  * .travis.yml
  * docs/docpad.coffee
  * docs/src/documents/api.html.eco
  * docs/src/documents/spec.html.eco
  * docs/src/layouts/default.html.eco
  * docs/src/partials/analytics.html.eco
  * docs/src/partials/method.html.eco
  * index.js
  * gulpfile.js
  * test/require.js

### default

Calls the following tasks

  * config

### docs

Calls the following tasks

  * dox

### dox

Parses *.js* sources with [dox](https://github.com/visionmedia/dox) and generates
an omonym *.json* file in the *targetDir*. File *index.js* is ignored.

  * targetDir: docs/src/files/json/dox

### generatefiles

Calls the following tasks

  * .gitignore
  * .npmignore

### jshint

Lints sources in `src/*js`

### mkdirs

Create `dox.targetDir` and the following dirs

  * src
  * docs/out
  * test

### npm:install

Installs npm packages I always use.

#### dependency

  * gulp

#### devdependency

  * gulp
  * mocha
  * should

### overwrite:package.json

Overwrites package.json attributes.

### rendertemplates

Renders the following templates

  * docs/src/documents/index.html.md
  * README.md

### scaffold

Calls the following tasks

  * mkdirs
  * generatefiles
  * copyfiles
  * overwrite:package.json
  * rendertemplates

### test

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: list

### touchfiles

Copies the following files, only if they did not exist yet

  * docs/package.json

