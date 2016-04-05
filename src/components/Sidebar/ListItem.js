import React, { PropTypes } from 'react';

const getLabel = (title) => title.charAt(0);

const ListItem = ({ list, fetchTodos, deleteList }) => {
  const handleClick = () => {
    if (!list.active) fetchTodos(list.id);
  };
  const handleDoubleClick = () => {
    const message = 'Are you sure you want to delete this list?';
    const confirmed = confirm(message); // eslint-disable-line no-alert
    if (confirmed) deleteList(list.id);
  };
  return (
    <a
      className="list"
      id={list.active ? 'active' : null}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {getLabel(list.title)}
    </a>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

export default ListItem;
