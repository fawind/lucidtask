import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import './sidebar.css';

const Sidebar = ({ lists, fetchTodos, deleteList, addList }) => {
  const handleAddList = () => {
    const title = prompt('New list title'); // eslint-disable-line no-alert
    if (title !== null && title.length > 0) {
      addList(title);
    }
  };
  return (
    <div className="sidebar">
      {lists.map(list =>
         <ListItem
           key={list.id}
           list={list}
           fetchTodos={fetchTodos}
           deleteList={deleteList}
         />)}
      <a className="list" onClick={handleAddList}>+</a>
    </div>
  );
};

Sidebar.propTypes = {
  lists: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
};

export default Sidebar;
