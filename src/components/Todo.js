import React, { PropTypes } from 'react';
import './todo.css';

const Todo = ({ text, color }) => (
  <div
    className="todo"
    style={{ backgroundColor: color }}
  >
      {text}
    </div>
);

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Todo;
