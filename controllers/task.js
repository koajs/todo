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

exports.list = function* () {
  return yield Task.list();
};

exports.get = function* () {
  var tid = this.params.id;
  return yield Task.get(tid);
};

exports.add = function* () {
  var title = this.request.body.title;
  var task = { title: title, finished: 0, created_at: new Date() };
  var id = yield Task.insert(task);
  this.body = {id: id};
  this.staus = 201;
};

exports.update = function *() {
  var tid = this.params.id;
  var task = this.request.body;
  task.updated_at = new Date();

  yield Task.updateById(tid, task);
  return 200;
};
