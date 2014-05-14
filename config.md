
# config

## Tasks

### default

Calls the following tasks

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

  * .jshintrc
  * .travis.yml
  * index.js
  * gulpfile.js
  * docs/api.html
  * docs/index.html
  * test/require.js
  * src/index.js

### generateignorefiles

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

### gitpull

Pull code from remote repo, launches

  * git pull

### gitpush

Push code to remote repo, launches

  * git push

### jshint

Lints sources in `src/*js`

### mocha

Runs tests with [mocha](http://visionmedia.github.io/mocha/)

  * reporter: nyan

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

### indexhtml

Generate *docs/index.html* from *README.md*

### readme

Overwrite some *README.md* sections.

### renderdocs

Calls the following tasks

  * indexhtml

### rendertemplates

Renders the following templates

  * docs/api.html

### scaffold

Calls the following tasks

  * generateignorefiles
  * generatefiles
  * packagejson

### setup

Calls the following tasks

  * gitpull
  * npminstall

### test

Calls the following tasks

  * jshint
  * mocha

### watch

Start watching files

#### src

Watch sources

  * glob: src/**

Execute the following

##### tasks

  * dox

#### docs

Watch docs

  * glob: docs/**

Execute the following

##### tasks

  * docsreload

