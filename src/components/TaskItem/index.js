import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

export default class TaskItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { title: this.props.item.title };
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyDown = this._handleKeyDown.bind(this);
    this._submitText = this._submitText.bind(this);
  }

  componentDidUpdate() {
    if (this.props.item.edit) {
      ReactDOM.findDOMNode(this.refs.input).select();
    }
  }

  _handleChange(e) {
    this.setState({ title: e.target.value });
  }

  _handleKeyDown(e) {
    if (e.which === 13) this._submitText();
  }

  _submitText() {
    console.log('submit');
    ReactDOM.findDOMNode(this.refs.input).blur();
    this.props.item.edit = false;
    if (this.state.title !== this.props.item.title) {
      // this.props.editTodo(this.props.item.id, this.state.title);
    }
    this.forceUpdate();
  }

  renderTextInput() {
    return (
      <div
        className="actions"
        style={{ backgroundColor: this.props.item.color }}
      >
        <div className="item task">
          <input
            ref="input"
            type="text"
            value={this.state.title}
            onChange={this._handleChange}
            onBlur={this._submitText}
            onKeyDown={this._handleKeyDown}
          />
        </div>
        <div className="item actionsPlaceholder" id="done">
          <i className="material-icons">done</i>
        </div>
      </div>
    );
  }

  renderTaskItem() {
    return (
      <div
        className="item task"
        style={{ backgroundColor: this.props.item.color }}
      >
        {this.props.item.title}
      </div>
    );
  }

  render() {
    if (this.props.item.edit) {
      return this.renderTextInput();
    }
    return this.renderTaskItem();
  }
}

TaskItem.propTypes = {
  item: PropTypes.object.isRequired,
};
