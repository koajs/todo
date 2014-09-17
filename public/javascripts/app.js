var React = require('react');
global.React = React;

var TodoApp = require('./components/todo_app');

React.renderComponent(TodoApp(), document.getElementById('todoapp'));
