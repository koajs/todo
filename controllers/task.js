/*!
 * koa-todo - controllers/task.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var Task = require('../models/task');

exports.add = function *() {
  var title = this.request.body.title;
  var task = { title: title, finished: 0, created_at: new Date() };
  yield Task.insert(task);
  this.redirect('/');
};

exports.finish = function *() {
  var tid = this.params.id;
  var task = { finished: 1, updated_at: new Date() };
  yield Task.updateById(tid, task);
  this.redirect('/');
};
