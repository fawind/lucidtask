import React, { PropTypes } from 'react';
import './completedList.css';

const CompletedList = ({ tasks, clearCompleted }) => {
  const _clearCompleted = clearCompleted.bind(this);
  return (
    <div
      className="todoList"
      onDoubleClick={_clearCompleted}
    >
      <div className="todoContainer">
        {tasks.map(task =>
          <div key={task.id} className="todo completed">{task.title}</div>
        )}
      </div>
    </div>
  );
};

CompletedList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default CompletedList;
