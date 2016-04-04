import React, { PropTypes } from 'react';
import './addButton.css';

const AddButton = ({ addTodo }) => {
  const _addTodo = addTodo.bind(this, 'NewTodo');

  return (
    <a
      className="fab"
      id="addButton"
      onClick={_addTodo}
    >
      <i className="material-icons">add</i>
    </a>
  );
};

AddButton.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default AddButton;
