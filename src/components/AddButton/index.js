import React, { PropTypes } from 'react';
import './styles.css';

const AddButton = ({ addList, addTask, listViewActive }) => {
  const _addList = addList.bind(this);
  const _addTask = addTask.bind(this, 'NewTodo');

  const handleAddList = () => {
    const title = prompt('New list title'); // eslint-disable-line no-alert
    if (title !== null && title.length > 0) {
      _addList(title);
    }
  };

  const onClickAction = () => {
    if (listViewActive) {
      handleAddList();
    } else {
      _addTask();
    }
  };

  return (
    <a
      className="fab"
      id="addButton"
      style={{ backgroundColor: listViewActive ? '#90A4AE' : '#f44336' }}
      onClick={onClickAction}
    >
      <i className="material-icons">add</i>
    </a>
  );
};

AddButton.propTypes = {
  addList: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
  listViewActive: PropTypes.bool.isRequired,
};

export default AddButton;
