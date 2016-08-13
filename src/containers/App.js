import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import CompletedList from '../components/CompletedList';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import * as taskActions from '../actions/tasksAsync';
import './app.css';

const App = ({ activeTasklist, tasklists, actions }) => {
  const openTasks = activeTasklist.tasks.filter(t => t.status === 'needsAction');
  const completedTasks = activeTasklist.tasks.filter(t => t.status === 'completed');
  return (
    <div className="container">
      <TodoList
        tasks={openTasks}
        actions={actions}
      />
      <CompletedList
        tasks={completedTasks}
        clearCompleted={actions.clearCompleted}
      />
      <Sidebar
        tasklists={tasklists}
        activeListId={activeTasklist.id}
        actions={actions}
      />
      <AddButton addTask={actions.addTask} />
    </div>
  );
};

App.propTypes = {
  activeTasklist: PropTypes.object.isRequired,
  tasklists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    activeTasklist: state.activeTasklist,
    tasklists: state.tasklists,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(taskActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
