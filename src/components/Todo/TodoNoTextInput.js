import React, { Component, PropTypes } from 'react';

class TodoDrag extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this._elemDown = this._elemDown.bind(this);
  }

  _elemDown(e) {
  }

  render() {
    return (
      <div
        className="todo content"
        style={{ backgroundColor: this.props.color }}
        onMouseDown={this._elemDown}
      >
        {this.props.text}
      </div>
    );
  }
}

TodoDrag.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TodoDrag;
