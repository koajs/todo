/**
 * @jsx React.DOM
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TextInput = React.createClass({
  propTypes: {
    className: ReactPropTypes.string,
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string,
    onSave: ReactPropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    return (
      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        value={this.state.value}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        autoFocus={true}
      />
    );
  },

  _save: function () {
    this.props.onSave(this.state.value);
    this.setState({
      value: ''
    });
  },

  _onChange: function (event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
});

module.exports = TextInput;
