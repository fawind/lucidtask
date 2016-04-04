import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: this.props.item.title };
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._submitText = this._submitText.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.input).select();
  }

  _handleChange(e) {
    this.setState({ title: e.target.value });
  }

  _handleKeyDown(e) {
    if (e.which === 13) this._submitText();
  }

  _submitText() {
    if (this.state.title === this.props.item.title) {
      ReactDOM.findDOMNode(this.refs.input).blur();
      this.props.item.edit = false;
      return;
    }
    this.props.editTodo(this.props.item.id, this.state.title);
  }

  render() {
    return (
      <div
        className="todo"
        style={{ backgroundColor: this.props.item.color }}
      >
        <input
          ref="input"
          type="text"
          value={this.state.title}
          onChange={this._handleChange}
          onBlur={this._submitText}
          onKeyDown={this._handleKeyDown}
        />
      </div>
    );
  }
}

TodoTextInput.propTypes = {
  item: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
};

export default TodoTextInput;
