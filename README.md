Vue-boilerplate
===============

A front-end template that helps you build fast, modern mobile web apps.

## Features

* [Vue.js](http://vuejs.org/) / [Browserify](http://browserify.org/) ♡
* [GSAP](https://greensock.com/gsap)
* CSS Autoprefixing
* Built-in preview server with BrowserSync
* Automagically compile Sass / ES6
* Automagically lint your scripts
* Awesome Image Optimization (via OptiPNG, pngquant, jpegtran and gifsicle)
* Unit Testing with [Prova](https://github.com/azer/prova)

## Getting Started

- Install: `npm install`
- Run: `gulp serve`

#### Third-Party Dependencies

*(HTML/CSS/JS/Images/etc)*

Third-party dependencies are managed with **npm**

```sh
$ npm install --save awesome-module
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
