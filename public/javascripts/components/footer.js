/**
 * @jsx React.DOM
 */

var React = require('react');
var taskStore = require('../task_store');

var Footer = React.createClass({

  // in dev env, will check tasks' type
  propTypes: {
    tasks: React.PropTypes.array.isRequired,
    type: React.PropTypes.string.isRequired
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

    var filter = ['All', 'Active', 'Completed'].map(function (t) {
      var selected = this.props.type === t ? 'selected' : '';
      var hash = '#' + (t === 'All' ? '' : t);
      return (
        <li key={t}>
          <a
            href={hash}
            className={selected}
            onClick={this._onTypeButtonClick}>
            {t}
          </a>
        </li>
      );

    }.bind(this));

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {left}
          </strong>
          {leftLabel}
        </span>
        <ul id="filters">
        {filter}
        </ul>
        {clearCompletedButton}
      </footer>
    );
  },

  _onClearCompleteButtonClick: function () {
    taskStore.clearCompeted();
  },

   _onTypeButtonClick: function (event) {
    var newType = event.target.textContent;
    taskStore.selectType(newType);
  }
});

module.exports = Footer;
