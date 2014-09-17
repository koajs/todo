var EventEmitter = require('events').EventEmitter;
var inherits = require('util').inherits;

function TaskStore() {
  this._tasks = [];
  this._id = 1;
}

inherits(TaskStore, EventEmitter);

TaskStore.prototype.init = function () {
  this._id = 3;
  // TODO: init from server
  this._tasks = [
    {id: 1, title: 'test1', complete: false},
    {id: 2, title: 'test2', complete: true}
  ];
  this._change();
};

TaskStore.prototype.list = function () {
  return this._tasks;
};

TaskStore.prototype.create = function (title) {
  var task = {id: this._id++, title: title, complete: false};
  this._tasks.push(task);
  this._change();
};

TaskStore.prototype.update = function (task) {
  for (var i = 0; i < this._tasks.length; i++) {
    var item = this._tasks[i];
    if (item.id !== task.id) continue;
    for (var key in task) item[key] = task[key];
    this._change();
    return;
  }
};

TaskStore.prototype.destroy = function (task) {
  this._tasks = this._tasks.filter(function (t) {
    return t.id !== task.id;
  });
  this._change();
}

TaskStore.prototype.clearCompeted = function () {
  this._tasks = this._tasks.filter(function (task) {
    return !task.complete;
  });
  this._change();
};

TaskStore.prototype.completeAll = function () {
  this._tasks.forEach(function (task) {
    task.complete = true;
  });

  this._change();
};

TaskStore.prototype._change = function () {
  this.emit('change');
};

var taskStore = new TaskStore();
module.exports = taskStore;
