/**
 * @jsx React.DOM
 */

var React = require('react');
var TextInput = require('./textinput');
var taskStore = require('../task_store');

var Header = React.createClass({

  render: function() {
    return (
      <header id="header">
        <h1>todos</h1>
        <TextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave}
        />
      </header>
    );
  },

  _onSave: function (title) {
    if (!title.trim()) return;
    taskStore.create(title);
  }
});

module.exports = Header;
