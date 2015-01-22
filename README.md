Vue-boilerplate
===============

A front-end template that helps you build fast, modern mobile web apps. (IE9+) @see [Web Starter Kit](https://github.com/google/web-starter-kit)


##Installation
 
1. [NodeJS](http://nodejs.org) - use the installer.
2. [Gulp](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` 

## Getting Started

- Install: `npm install`
- Run: `gulp serve`

## ! Warning (directives / W3C)

Added `Vue.config.prefix = 'data-v-';` (app/src/ui/index.js)

Example: `data-v-on="click: testNavigation"`

## Features

* [Vue.js](http://vuejs.org/) / [Browserify](http://browserify.org/) ♡
* [GSAP](https://greensock.com/gsap)
* CSS Autoprefixing
* Built-in preview server with [BrowserSync](http://www.browsersync.io/)
* Automagically compile Sass / ES6
* Automagically lint your scripts
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Unit Testing with [Prova](https://github.com/azer/prova)



#### Third-Party Dependencies

*(HTML/CSS/JS/Images/etc)*

Third-party dependencies are managed with **npm**

```sh
$ npm install --save awesome-module
```

## Test

```sh
$ gulp test
```

## Build

```sh
$ gulp serve:dist
```

or

```sh
$ gulp build
```

## Docs

[JSDoc 3](http://usejsdoc.org/)

```sh
$ gulp docs
```

## Publish (AWS)

```sh
$ gulp publish
```
- Options (@see env.json )
