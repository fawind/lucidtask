import React, { PropTypes } from 'react';
import TodoDrag from './TodoDrag';
import TodoTextInput from './TodoTextInput';
import './todo.css';

const Todo = ({ item, sharedProps }) => {
  if (!item.edit) {
    return <TodoDrag text={item.text} color={item.color} />;
  }
  return <TodoTextInput item={item} editTodo={sharedProps.editTodo} />;
};

Todo.propTypes = {
  item: PropTypes.object.isRequired,
  sharedProps: PropTypes.object.isRequired,
};

export default Todo;
