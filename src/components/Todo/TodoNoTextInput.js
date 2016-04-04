import React, { PropTypes } from 'react';

const TodoNoTextInput = ({ text, color }) => (
  <div
    className="todo content"
    style={{ backgroundColor: color }}
  >
    {text}
  </div>
);

TodoNoTextInput.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default TodoNoTextInput;
