/**
 * @jsx React.DOM
 */

var React = require('react');
var Todo = require('./todo');
var taskStore = require('../task_store');

var TodoList = React.createClass({

  propTypes: {
    tasks: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired
  },

  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (!this.props.tasks.length) {
      return null;
    }

    // filter by type
    var tasks = this.props.tasks;
    if (this.props.type !== 'All') {
      tasks = tasks.filter(function (task) {
        return this.props.type === 'Completed' ? task.complete : !task.complete;
      }.bind(this));
    }

    var todos = [];

    var todos = tasks.map(function(task) {
      return <Todo task={task} key={task.id}/>;
    });

    var areAllComplete = tasks.every(function (task) {
      return task.complete;
    });

    return (
      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={areAllComplete ? 'checked' : ''}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>
    );
  },

  _onToggleCompleteAll: function () {
    taskStore.completeAll();
  }
});

module.exports = TodoList;
