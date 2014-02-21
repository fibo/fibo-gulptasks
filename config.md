
# config

## Tasks

### .npmignore

Generates a .npmignore with the following content

  * .travis.yml
  * docs/

Note that this task is treated a part and not in *copyfiles* cause adding a 
*.npmignore* in the *root/* folder will tell npm to ignore such files.

### copyfiles

Copies the following files

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

  * README.md

### scaffold

Calls the following tasks

  * mkdirs
  * .npmignore
  * copyfiles
  * rendertemplates

### test

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: list

### touchfiles

Copies the following files, only if they did not exist yet

  * docs/src/documents/index.html.md

