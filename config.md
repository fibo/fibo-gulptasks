
# config

## Tasks

### .jshintrc

### .travis.yml

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
  * docs/src/layouts
  * docs/src/partials
  * test

### index.js

### npm:install

Installs npm packages I use in everyone of my packages.

#### dev

  * gulp
  * mocha
  * should

#### global

  * docpad
  * dox
  * gulp

### scaffold

Calls the following tasks

  * mkdirs
  * .jshintrc
  * .travis.yml
  * index.js

### test

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: list

