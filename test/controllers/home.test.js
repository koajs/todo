/*!
 * koa-todo - test/controllers/home.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var app = require('../../app');

describe('controllers/home', function () {
  it('should GET / ok', function (done) {
    request(app)
      .get('/')
      .expect(200)
      .expect(/Koa • Todo/)
      .expect(/todoapp/, done);
  });
});
