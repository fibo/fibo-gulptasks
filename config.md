
# config

## Tasks

### default

Calls the following tasks

  * setup
  * dev

### dev

#### deps

  * docsserver
  * watch

### docsserver

Gulp-connect server with options

  * root: docs
  * livereload: true **(hardcoded)**

### dox

Parses *.js* sources with [dox](https://github.com/visionmedia/dox) and
generates *outputFile*. File *index.js* is ignored. Directory containing
*outputFile* is created by this task.

  * outputfile: docs/json/dox.json

### generatefiles

Generate the following files

#### overwrite

  * .jshintrc
  * .travis.yml
  * index.js
  * gulpfile.js
  * docs/api.html
  * docs/index.html
  * test/require.js

#### touch

  * README.md
  * src/index.js

### generateignorefiles

#### deps

  * gitignore
  * npmignore

### npminstall

Install npm packages, launches

  * npm install

### gitignore

Generates a *.gitignore* file with the following content

  * *~
  * .codio
  * node_modules
  * npm-debug.log

Note that this task is treated a part and not in *copyfiles* cause adding a 
*.gitignore* in the *root/* folder will tell git to ignore such files.

Existing *.gitignore* file will not be overwritten.

### githubpages

Update GitHub pages, launches

  * git subtree push --prefix docs origin gh-pages

### gitpull

Pull code from remote repo, launches

  * git pull

### gitpush

Push code to remote repo, launches

  * git push

### jshint

Lints sources

### mocha

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: nyan

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

Overwrite *package.json* attributes.

#### devDependencies

  * gulp: ^3.6.2
  * mocha: ^1.18.2
  * should: ^3.1.4

#### license

  * type: MIT
  * url: http://fibo.mit-license.org/

#### scripts

  * test: mocha --bail --require should --reporter min

### scaffold

#### deps

  * generateignorefiles
  * generatefiles
  * packagejson

### setup

#### deps

  * gitpull
  * packagejson
  * scaffold

### test

#### deps

  * jshint
  * mocha

### watch

Start watching files

#### src

  * glob: src/*js

##### tasks

  * dox

#### docs

  * glob: docs/**

##### tasks

  * docsreload

#### readme

  * glob: README.md

##### tasks

  * docs/index.html

#### test

  * glob: test/*js

##### tasks

  * test

