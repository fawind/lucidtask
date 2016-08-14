import React, { Component, PropTypes } from 'react';

export default class TaskItem extends Component {
  render() {
    return (
      <div>{this.props.item.title}</div>
    );
  }
}

TaskItem.propTypes = {
  item: PropTypes.object.isRequired,
};
