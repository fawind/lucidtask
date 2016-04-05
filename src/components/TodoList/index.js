import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Reorder from '../Reorder';
import Todo from '../Todo';
import SwipePlaceholder from '../SwipePlaceholder';
import './todoList.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

const getColor = (index, total) => {
  if (total <= 4) return colorScale(index / 4).hex();
  return colorScale(index / (total - 1)).hex();
};

const TodoList = ({ todos, actions }) => {
  const list = todos.map((todo, index) => (
    Object.assign({}, todo,
      { color: getColor(index, todos.length), edit: false })
  ));
  const reordered = (e, item, from, to) => {
    const previousTodoId = todos[to].id;
    actions.moveTodo(item.id, previousTodoId);
  };
  const itemClicked = (e, item) => {
    const _item = item;
    _item.edit = true;
  };
  const swipeLeft = (e, item) => actions.deleteTodo(item.id);
  const swipeRight = (e, item) => actions.toggleTodo(item.id);

  return (
    <Reorder
      itemKey="id"
      lock="auto"
      holdTime="200"
      callback={reordered}
      itemClicked={itemClicked}
      swipeLeft={swipeLeft}
      swipeRight={swipeRight}
      list={list}
      template={Todo}
      placeholderTemplate={SwipePlaceholder}
      listClass="todoList"
      itemClass="todoContainer"
      sharedProps={{ editTodo: actions.editTodo }}
    />);
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  actions: PropTypes.object.isRequired,
};

export default TodoList;
