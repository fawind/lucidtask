import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Reorder from './Reorder';
import Todo from './Todo';
import './todoList.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

const TodoList = ({ todos, actions }) => {
  const list = todos.map((todo, index) => (
    Object.assign({}, todo,
      { color: colorScale(index / (todos.length - 1)).hex(), edit: false })
  ));
  const reordered = (ev, item, from, to) => actions.moveTodo(from, to);
  const itemClicked = (ev, item) => {
    const _item = item;
    _item.edit = true;
  };

  return (
    <Reorder
      itemKey="id"
      holdTime="500"
      callback={reordered}
      itemClicked={itemClicked}
      list={list}
      template={Todo}
      listClass="todoList"
      itemClass="todoContainer"
      sharedProps={{ editTodo: actions.editTodo }}
    />);
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  actions: PropTypes.object.isRequired,
};

export default TodoList;
