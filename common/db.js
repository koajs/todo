/*!
 * koa-todo - common/db.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var leveldb = require('levelup');
var memdown = require('memdown');
var config = require('../config');
var thunkify = require('thunkify-wrap');

var db = leveldb('/does/not/matter', {
  valueEncoding: 'json',
  db: memdown
});

thunkify(db, ['get', 'put', 'del', 'batch']);
module.exports = db;
