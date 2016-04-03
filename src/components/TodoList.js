import React, { PropTypes } from 'react';
import chroma from 'chroma-js';
import Todo from './Todo';
import './todoList.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

const TodoList = ({ todos }) => (
  <div className="todoList">
    {todos.map((todo, index) =>
      <Todo
        key={todo.id}
        color={colorScale(index / todos.length).hex()}
        {...todo}
      />
    )}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
};

export default TodoList;
