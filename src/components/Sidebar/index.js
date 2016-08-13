import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import './sidebar.css';

const Sidebar = ({ tasklists, activeListId, actions }) => {
  const handleAddList = () => {
    const title = prompt('New list title'); // eslint-disable-line no-alert
    if (title !== null && title.length > 0) {
      actions.addList(title);
    }
  };

  return (
    <div className="sidebar">
      {tasklists.map(list =>
         <ListItem
           key={list.id}
           tasklist={list}
           active={list.id === activeListId}
           switchList={actions.switchList}
           deleteList={actions.deleteList}
         />)}
      <a className="list" onClick={handleAddList}>+</a>
    </div>
  );
};

Sidebar.propTypes = {
  tasklists: PropTypes.array.isRequired,
  activeListId: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Sidebar;
