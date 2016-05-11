import React, { PropTypes } from 'react';

const TodoNoTextInput = ({ title, color }) => (
  <div
    className="todo content"
    style={{ backgroundColor: color }}
  >
    {title}
  </div>
);

TodoNoTextInput.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TodoNoTextInput;
