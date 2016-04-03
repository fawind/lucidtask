import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Reorder from 'react-reorder';
import Todo from './Todo';
import './todoList.css';
import './todo.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

const TodoList = ({ todos, actions }) => {
  console.log(actions);
  const list = todos.map((todo, index) => (
    Object.assign({},
      todo,
      { color: colorScale(index / (todos.length - 1)).hex() }))
  );

  const reordered = (ev, item, from, to) => actions.moveTodo(from, to);

  return (
    <Reorder
      itemKey="id"
      lock="horizontal"
      holdTime="500"
      callback={reordered}
      list={list}
      template={Todo}
      listClass="todoList"
      itemClass="todo"
    />);
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
};

export default TodoList;
