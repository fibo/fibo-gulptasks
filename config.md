
# config

## Tasks

### copyfiles

Copies the following files

  * .jshintrc
  * .travis.yml
  * docs/docpad.coffee
  * docs/package.json
  * docs/src/documents/api.html.eco
  * docs/src/documents/spec.html.eco
  * docs/src/layouts/default.html.eco
  * index.js
  * gulpfile.js
  * test/require.js

### default

Calls the following tasks

  * docsserver
  * watch

### docs

Calls the following tasks

  * dox

### docsserver

Gulp-connect server with options

  * root: docs
  * livereload: true **(hardcoded)**

### dox

Parses *.js* sources with [dox](https://github.com/visionmedia/dox) and
generates *outputFile*. File *index.js* is ignored. Directory containing
*outputFile* is created by this task.

  * outputFile: docs/src/files/json/dox.json

### generatefiles

Calls the following tasks

  * gitignore
  * npmignore

### gitignore

Generates a *.gitignore* file with the following content

  * *~
  * .codio
  * node_modules
  * npm-debug.log

Note that this task is treated a part and not in *copyfiles* cause adding a 
*.gitignore* in the *root/* folder will tell git to ignore such files.

Existing *.gitignore* file will not be overwritten.

### gitpush

Push code to remote repo, launches

  * git push

### jshint

Lints sources in `src/*js`

### mkdirs

Create the following dirs

  * src
  * docs
  * test

### npmignore

Generates a *.npmignore* file with the following content

  * .travis.yml
  * .jshintrc
  * docs/
  * gulpfile.js

Note that this task is treated a part and not in *copyfiles* cause adding a
*.npmignore* in the *root/* folder will tell npm to ignore such files.

Existing *.npmignore* file will not be overwritten.

### npminstall

Install npm packages, launches

  * npm install

### packagejson

Overwrites *package.json* attributes.

#### devDependencies

  * gulp: ^3.6.2
  * mocha: ^1.18.2
  * should: ^3.1.4
  * fibo-gulptasks: git://github.com/fibo/fibo-gulptasks

#### license

  * type: MIT
  * url: http://fibo.mit-license.org/

#### scripts

  * test: mocha --bail --require should --reporter min

### rendertemplates

Renders the following templates

  * docs/src/documents/index.html.md
  * README.md

### scaffold

Calls the following tasks

  * mkdirs
  * generatefiles
  * copyfiles
  * packagejson
  * rendertemplates

### test

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: nyan

### touchfiles

Copies the following files, only if they did not exist yet

  * docs/package.json

