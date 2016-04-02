import React, { PropTypes } from 'react';

const Todo = ({ text }) => (
  <div>{text}</div>
);

Todo.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Todo;
