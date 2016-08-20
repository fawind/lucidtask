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
  item: PropTypes.object.isRequired,
  sharedProps: PropTypes.object.isRequired,
};

export default TaskItem;
