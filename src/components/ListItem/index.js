import React, { Component, PropTypes } from 'react';

export default class ListItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    if (!this.props.active) {
      this.props.openList(this.props.id);
    } else {
      this.props.closeList();
    }
  }

  render() {
    return (
      <div
        className="item list"
        onClick={this.toggleList}
      >
        {this.props.title}
      </div>
    );
  }
}

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  openList: PropTypes.func.isRequired,
  closeList: PropTypes.func.isRequired,
};
