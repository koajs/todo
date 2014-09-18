var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;
var request = require('superagent');

function TaskStore() {
  this._tasks = [];
  this._change();
}

inherits(TaskStore, EventEmitter);

TaskStore.prototype.list = function () {
  return this._tasks;
};

TaskStore.prototype.create = function (title) {
  console.log('create')
  request
    .post('/tasks')
    .send({title: title})
    .end(this._change.bind(this));
};

TaskStore.prototype.update = function (task) {
  request
    .put('/tasks/' + task.id)
    .send(task)
    .end(this._change.bind(this));
};

TaskStore.prototype.destroy = function (task) {
  request
    .del('/tasks/' + task.id)
    .end(this._change.bind(this));
}

TaskStore.prototype.clearCompeted = function () {
  request
    .post('/tasks/clear')
    .end(this._change.bind(this));
};

TaskStore.prototype.completeAll = function () {
  request
    .post('/tasks/complete')
    .end(this._change.bind(this));
};

TaskStore.prototype._change = function () {
  request
  .get('/tasks')
  .end(function (err, res) {
    if (err) {
      console.error(err);
      this.emit('error', err);
    }
    if (res.body) this._tasks = res.body;
    this.emit('change');
  }.bind(this));
};

var taskStore = new TaskStore();
module.exports = taskStore;
