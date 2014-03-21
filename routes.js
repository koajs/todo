/*!
 * koa-todo - routes.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var home = require('./controllers/home');
var task = require('./controllers/task');

module.exports = function routes(app) {
  app.get('/', home);
  app.post('/task', task.add);
  app.get('/task/(:id)/finish', task.finish);
};
