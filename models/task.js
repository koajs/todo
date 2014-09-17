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
  var finishes = [];
  var stream = db.createReadStream();
  stream.on('data', function (data) {
    var value = data.value;
    value.id = data.key;
    if (value.finished) {
      finishes.push(value);
    } else {
      items.push(value);
    }
  });
  var end = thunkify.event(stream);
  yield end();
  items.sort(function (a, b) {
    return a.created_at > b.created_at ? -1 : 1;
  });
  finishes.sort(function (a, b) {
    return a.created_at > b.created_at ? -1 : 1;
  });
  return items.concat(finishes);
};

exports.get = function* (tid) {
  return yield db.get(tid);
};
