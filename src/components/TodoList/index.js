import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Reorder from '../Reorder';
import Todo from '../Todo';
import SwipePlaceholder from '../SwipePlaceholder';
import './todoList.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

const getColor = (index, total) => {
  if (total <= 2) return colorScale(index / 2).hex();
  return colorScale(index / (total - 1)).hex();
};

const TodoList = ({ tasks, actions }) => {
  const list = tasks.map((task, index) => (
    Object.assign({}, task,
      { color: getColor(index, tasks.length), edit: false })
  ));

  const reordered = (e, item, from, to) => {
    const previousTaskId = tasks[to].id;
    actions.moveTask(item.id, previousTaskId);
  };

  const itemClicked = (e, item) => {
    const _item = item;
    _item.edit = true;
  };

  const swipeLeft = (e, item) => actions.deleteTask(item.id);

  const swipeRight = (e, item) => actions.toggleTask(item.id);

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
      sharedProps={{ editTodo: actions.editTask }}
    />);
};

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
  actions: PropTypes.object.isRequired,
};

export default TodoList;
