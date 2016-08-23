import React, { PropTypes } from 'react';
import TaskInputItem from './TaskInputItem';
import './styles.css';

const TaskItem = ({ item, sharedProps }) => {
  if (!item.edit) {
    return (
      <div
        className="item task"
        style={{ backgroundColor: item.color }}
      >
        {item.title}
      </div>
    );
  }
  return <TaskInputItem item={item} editTask={sharedProps.editTask} />;
};

TaskItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
  }).isRequired,
  sharedProps: PropTypes.shape({
    editTask: PropTypes.func.isRequired,
  }).isRequired,
};

export default TaskItem;
