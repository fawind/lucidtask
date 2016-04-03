import React, { PropTypes } from 'react';

const Todo = ({ item }) => (
  <div
    className="content"
    style={{ backgroundColor: item.color }}
  >
    {item.text}
  </div>
);

Todo.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Todo;
