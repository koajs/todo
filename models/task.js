/*!
 * koa-todo - models/task.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var utility = require('utility');
var crypto = require('crypto');
var db = require('../common/db');
var thunkify = require('thunkify-wrap');

exports.insert = function* (task) {
  var id = utility.md5(task.title + crypto.randomBytes(60).toString('hex'));
  yield db.put(id, task);
  return id;
};

exports.updateById = function* (id, task) {
  var row = yield db.get(id);
  for (var key in task) {
    row[key] = task[key];
  }
  yield db.put(id, row);
};

exports.list = function* () {
  var err = null;
  var items = [];
  var stream = db.createReadStream();
  stream.on('data', function (data) {
    var value = data.value;
    value.id = data.key;
    items.push(value);
  });
  var end = thunkify.event(stream);
  yield end();
  return items;
};

exports.get = function* (tid) {
  return yield db.get(tid);
};

exports.destroy = function* (tid) {
  return yield db.del(tid);
};

exports.clear = function* () {
  var tasks = yield exports.list();
  var ops = tasks.filter(function (task) {
    return task.complete;
  }).map(function (task) {
    return {
      type: 'del',
      key: task.id
    }
  });

  return yield db.batch(ops);
};

exports.complete = function* () {
  var tasks = yield exports.list();
  var ops = tasks.filter(function (task) {
    return !task.complete;
  }).map(function (task) {
    task.complete = true;
    return {
      type: 'put',
      key: task.id,
      value: task
    }
  });

  return yield db.batch(ops);
};
