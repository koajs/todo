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

  // restful task API
  app.post('/tasks/clear', task.clear);
  app.post('/tasks/complete', task.complete);
  app.get('/tasks', task.list);
  app.post('/tasks', task.add);
  app.put('/tasks/:id', task.update);
  app.del('/tasks/:id', task.destroy);
};
