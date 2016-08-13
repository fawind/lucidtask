import React, { PropTypes } from 'react';
import './addButton.css';

const AddButton = ({ addTask }) => {
  const _addTask = addTask.bind(this, 'New Task');
  return (
    <a
      className="fab"
      id="addButton"
      onClick={_addTask}
    >
      <i className="material-icons">add</i>
    </a>
  );
};

AddButton.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddButton;
