import React, { PropTypes } from 'react';
import './completedList.css';

const CompletedList = ({ todos, clearCompleted }) => {
  const _clearCompleted = clearCompleted.bind(this);
  return (
    <div
      className="todoList"
      onDoubleClick={_clearCompleted}
    >
      <div className="todoContainer">
        {todos.map(todo =>
          <div key={todo.id} className="todo completed">{todo.title}</div>
        )}
      </div>
    </div>
  );
};

CompletedList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default CompletedList;
