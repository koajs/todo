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
  this.body = yield Task.list();
};

exports.add = function* () {
  var title = this.request.body.title;
  if (!title) {
    this.status = 400;
    this.body = { success: false, message: 'title required' };
    return;
  }
  var task = { title: title, complete: false, created_at: new Date() };
  var id = yield Task.insert(task);
  this.body = {id: id};
  this.status = 201;
};

exports.update = function* () {
  var tid = this.params.id;
  var task = this.request.body;
  task.updated_at = new Date();

  yield Task.updateById(tid, task);
  this.status = 200;
};

exports.destroy = function* () {
  var tid = this.params.id;
  yield Task.destroy(tid);
  this.status = 200;
};

exports.complete = function* () {
  yield Task.complete();
  this.status = 200;
};

exports.clear = function* () {
  yield Task.clear();
  this.status = 200;
};
