import React, { PropTypes } from 'react';
import ListItem from './ListItem';
import './sidebar.css';

const Sidebar = ({ lists, fetchTodos }) => (
  <div className="sidebar">
    {lists.map(list => <ListItem key={list.id} list={list} fetchTodos={fetchTodos} />)}
  </div>
);

Sidebar.propTypes = {
  lists: PropTypes.array.isRequired,
  fetchTodos: PropTypes.func.isRequired,
};

export default Sidebar;
