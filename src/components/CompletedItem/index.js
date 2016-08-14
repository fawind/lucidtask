import React, { Component, PropTypes } from 'react';

export default class CompletedItem extends Component {
  render() {
    return (
      <div className="item task completed">
        {this.props.item.title}
      </div>
    );
  }
}

CompletedItem.propTypes = {
  item: PropTypes.object.isRequired,
};
