import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Reorder from './Reorder';
import Todo from './Todo';
import SwipePlaceholder from './SwipePlaceholder';
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
  const swipeLeft = () => console.log('Swipe left');
  const swipeRight = () => console.log('Swipe right');

  return (
    <Reorder
      itemKey="id"
      lock="auto"
      holdTime="100"
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
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  actions: PropTypes.object.isRequired,
};

export default TodoList;
