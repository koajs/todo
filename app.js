/*!
 * koa-todo - app.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var koa = require('koa');
var middlewares = require('koa-middlewares');
var routes = require('./routes');
var config = require('./config');

var app = koa();
app.outputErrors = true;

/**
 * cookie secret keys
 */
app.keys = ['todo secret', 'lol'];

/**
 * ignore favicon
 */
app.use(middlewares.favicon());

/**
 * response time header
 */
app.use(middlewares.rt());

/**
 * static file server
 */
app.use(middlewares.staticCache(path.join(__dirname, 'public'), {
  buffer: !config.debug,
  maxAge: config.debug ? 0 : 60 * 60 * 24 * 7
}));
app.use(middlewares.bodyParser());
app.use(middlewares.session());

if (config.debug) {
  app.use(middlewares.logger());
}

/**
 * csrf
 */
middlewares.csrf(app);
app.use(function *checkCsrf(next) {
  if (this.method === 'GET' ||
      this.method === 'HEAD' ||
      this.method === 'OPTIONS') {
    return yield *next;
  }

  this.assertCsrf(this.request.body);
  yield *next;
});

/**
 * ejs template engine
 */
middlewares.ejs(app, {
  root: __dirname + '/views',
  layout: 'layout.html',
  cache: !config.debug,
  locals: {
    _csrf: function () {
      return this.csrf || '';
    },
    now: function () {
      return new Date();
    },
    config: config
  }
});

/**
 * router
 */
app.use(middlewares.router(app));
routes(app);

if (!module.parent) {
  app.listen(config.port);
  console.log('$ open http://127.0.0.1:' + config.port);
}

module.exports = app;

