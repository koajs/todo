/**
 * @jsx React.DOM
 */

var React = require('react');
var taskStore = require('../task_store');

var Footer = React.createClass({

  // in dev env, will check tasks' type
  propTypes: {
    tasks: React.PropTypes.array.isRequired
  },

  render: function() {
    var tasks = this.props.tasks;
    var total = tasks.length;
    var completed = tasks.filter(function (task) {
      return task.complete;
    }).length;

    var left = total - completed;
    var leftLabel = left === 1
      ? ' items left'
      : ' item left';

    var clearCompletedButton;
    if (completed > 0) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompleteButtonClick}>
          Clear completed ({completed})
        </button>
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {left}
          </strong>
          {leftLabel}
        </span>
        {clearCompletedButton}
      </footer>
    );
  },

  _onClearCompleteButtonClick: function () {
    taskStore.clearCompeted();
  }
});

module.exports = Footer;
