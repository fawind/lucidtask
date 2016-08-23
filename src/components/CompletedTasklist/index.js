import React, { PropTypes } from 'react';
import FlipMove from 'react-flip-move';
import './styles.css';

const DeleteButton = ({ taskId, deleteTask }) => {
  const _deleteTask = deleteTask.bind(this, taskId);
  return (
    <i
      className="material-icons"
      onClick={_deleteTask}
    >
      clear
    </i>
  );
};

DeleteButton.propTypes = {
  taskId: PropTypes.string.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

const CompletedTasklist = ({ tasks, deleteTask, clearCompleted }) => {
  const _clearCompleted = clearCompleted.bind(this);
  return (
    <FlipMove onDoubleClick={_clearCompleted}>
      {tasks.map(task => (
        <div className="completedWrapper" key={task.id}>
          <div className="item task completed">
            {task.title}
          </div>
          <div className="item actionPlaceholder">
            <DeleteButton taskId={task.id} deleteTask={deleteTask} />
          </div>
        </div>
      ))}
    </FlipMove>
  );
};

CompletedTasklist.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  deleteTask: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default CompletedTasklist;
