/*!
 * koa-todo - test/controllers/task.test.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var request = require('supertest');
var assert = require('assert');
var app = require('../../app');

describe('controllers/task', function () {
  it('should POST /tasks 201', function (done) {
    request(app)
    .post('/tasks')
    .send({title: 'todo'})
    .expect(201, done);
  });

  it('should POST /tasks without title 400', function (done) {
    request(app)
    .post('/tasks')
    .send({foo: 'bar'})
    .expect(400, done);
  });

  it('should GET /tasks 200', function (done) {
    request(app)
    .get('/tasks')
    .expect(200)
    .end(function (err, res) {
      assert(res.body.length === 1);
      this.id = res.body[0].id;
      done(err);
    }.bind(this));
  });

  it('should PUT /tasks/:id 200', function (done) {
    request(app)
    .put('/tasks/' + this.id)
    .send({title: 'foo'})
    .expect(200, function (err) {
      assert(err == undefined);
      request(app)
      .get('/tasks')
      .expect(200)
      .end(function (err, res) {
        assert(err == undefined);
        assert(res.body[0].title === 'foo');
        done();
      });
    });
  });

  it('should POST /tasks/complete 200', function (done) {
    request(app)
    .post('/tasks/complete')
    .expect(200)
    .end(function (err) {
      assert(err == undefined);
      request(app)
      .get('/tasks')
      .expect(200)
      .end(function (err, res) {
        assert(err == undefined);
        assert(res.body[0].complete);
        done();
      });
    });
  });

  it('should POST /tasks/clear 200', function (done) {
    request(app)
    .post('/tasks/clear')
    .expect(200)
    .end(function (err) {
      assert(err == undefined);
      request(app)
      .get('/tasks')
      .expect(200)
      .end(function (err, res) {
        assert(err == undefined);
        assert(res.body.length === 0);
        done();
      });
    });
  });


  it('should DELETE /tasks/:id 200', function (done) {
    request(app)
    .post('/tasks')
    .send({title: 'bar'})
    .expect(201)
    .end(function (err, res) {
      var id = res.body.id;
      assert(err == undefined);
      request(app)
      .del('/tasks/' + id)
      .expect(200)
      .end(function (err, res) {
        assert(err == undefined);
        request(app)
        .get('/tasks')
        .expect(200)
        .end(function (err, res) {
          assert(err == undefined);
          assert(res.body.length === 0);
          done();
        });
      });
    });
  });
});
