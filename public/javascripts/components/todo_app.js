/**
 * @jsx React.DOM
 */

var React = require('react');
var Header = require('./header');
var Footer = require('./footer');
var TodoList = require('./todo_list');
var taskStore = require('../task_store');

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      tasks: taskStore.list(),
      type: taskStore.getType()
    };
  },

  componentDidMount: function() {
    taskStore.on('change', this._onChange);
  },

  componentWillUnmount: function() {
    taskStore.removeListener('change', this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header/>
        <TodoList tasks={this.state.tasks} type={this.state.type} />
        <Footer tasks={this.state.tasks}  type={this.state.type}/>
      </div>
    );
  },

  _onChange: function () {
    this.setState({
      tasks: taskStore.list(),
      type: taskStore.getType()
    });
  }
});

module.exports = TodoApp;
