
# config

## Tasks

### default

Calls the following tasks

  * dev

### dev

#### deps

  * docsserver
  * watch

### docsserver

Gulp-connect server with options

  * root: docs
  * livereload: true **(hardcoded)**

#### deps

  * generatedocs

### dox

Parses *.js* sources with [dox](https://github.com/visionmedia/dox) and
generates *outputFile*. File *index.js* is ignored. Directory containing
*outputFile* is created by this task.

  * outputfile: docs/json/dox.json

#### deps

  * test

### generatedocs

#### deps

  * dox
  * touch

#### files

  * docs/api.html
  * docs/index.html

### touch

Generate the following files if they do not exists yet

#### files

  * .jshintrc
  * .travis.yml
  * README.md
  * src/index.js
  * index.js
  * test/require.js

#### deps

  * generateignorefiles
  * packagejson

### generateignorefiles

#### deps

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

  * npm install mocha --save-dev
  * npm install should --save-dev

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

### deploy

#### deps

  * test

### setup

#### deps

  * gitpull
  * npminstall
  * touch

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

