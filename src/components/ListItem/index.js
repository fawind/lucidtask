import React, { Component, PropTypes } from 'react';
import './styles.css';

const DeleteButton = ({ listId, deleteList }) => {
  const _deleteList = deleteList.bind(this, listId);

  const handleClick = () => {
    const message = 'Are your sure you want to delete this list?';
    const confirmed = confirm(message); // eslint-disable-line no-alert
    if (confirmed) _deleteList();
  };

  return (
    <i className="material-icons" onClick={handleClick}>
      clear
    </i>
  );
};

DeleteButton.propTypes = {
  listId: PropTypes.string.isRequired,
  deleteList: PropTypes.func.isRequired,
};

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

  renderListWithDeleteButton() {
    return (
      <div className="listItemWrapper">
        <div
          className="item list"
          onClick={this.toggleList}
        >
          {this.props.title}
        </div>
        <div className="item actionPlaceholder">
          <DeleteButton
            listId={this.props.id}
            deleteList={this.props.deleteList}
          />
        </div>
      </div>
    );
  }

  render() {
    if (this.props.deleteList) {
      return this.renderListWithDeleteButton();
    }
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
  deleteList: PropTypes.func,
};
