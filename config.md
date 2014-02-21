
# config

## Tasks

### copyfiles

Copies the following files

  * .npmignore
  * .jshintrc
  * .travis.yml
  * docs/docpad.js
  * docs/src/layouts/default.html.eco
  * index.js

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

### mkdirs

Create `dox.targetDir` and the following dirs

  * src
  * docs/out
  * docs/src/partials
  * test

### npm:install

Installs npm packages I always use.

#### dev

  * gulp
  * mocha
  * should

#### global

  * docpad
  * gulp

### rendertemplates

Renders the following templates

  * README.markdown

### scaffold

Calls the following tasks

  * mkdirs
  * copyfiles
  * rendertemplates

### test

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: list

