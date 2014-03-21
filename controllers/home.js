/*!
 * koa-todo - controllers/home.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
var Task = require('../models/task');

module.exports = function* home(next) {
  var tasks = yield Task.list();
  yield* this.render('index.html', {
    tasks: tasks
  });
};
