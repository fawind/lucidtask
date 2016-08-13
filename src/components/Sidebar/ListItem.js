import React, { PropTypes } from 'react';

const getLabel = (title) => title.charAt(0);

const ListItem = ({ tasklist, active, switchList, deleteList }) => {
  const handleClick = () => {
    if (!active) switchList(tasklist.id);
  };
  const handleDoubleClick = () => {
    const message = 'Are you sure you want to delete this list?';
    const confirmed = confirm(message); // eslint-disable-line no-alert
    if (confirmed) deleteList(tasklist.id);
  };
  return (
    <a
      className="list"
      id={active ? 'active' : null}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      title={tasklist.title}
    >
      {getLabel(tasklist.title)}
    </a>
  );
};

ListItem.propTypes = {
  tasklist: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  switchList: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
};

export default ListItem;
