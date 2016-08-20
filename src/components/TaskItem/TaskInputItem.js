import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class TaskInputItem extends Component {
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
    ReactDOM.findDOMNode(this.refs.input).blur();
    this.props.item.edit = false;
    if (this.state.title === this.props.item.title) return;
    this.props.editTask(this.props.item.id, this.state.title);
  }

  render() {
    return (
      <div
        className="item task"
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

TaskInputItem.propTypes = {
  item: PropTypes.object.isRequired,
  editTask: PropTypes.func.isRequired,
};
