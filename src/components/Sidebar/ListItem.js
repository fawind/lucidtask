import React, { PropTypes } from 'react';

const getLabel = (title) => title.charAt(0);

const ListItem = ({ list, fetchTodos }) => {
  const handleClick = () => fetchTodos(list.id);
  return (
    <a
      className="list"
      id={list.active ? 'active' : null}
      onClick={handleClick}
    >
      {getLabel(list.title)}
    </a>
  );
};

ListItem.propTypes = {
  list: PropTypes.object.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default ListItem;
