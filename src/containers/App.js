import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import CompletedList from '../components/CompletedList';
import Sidebar from '../components/Sidebar';
import AddButton from '../components/AddButton';
import * as TodoActions from '../actions/todos';
import './app.css';

const App = ({ todos, lists, actions }) => {
  const openTodos = todos.filter(t => t.status === 'needsAction');
  const completedTodos = todos.filter(t => t.status === 'completed');
  return (
    <div className="container">
      <TodoList
        todos={openTodos}
        actions={actions}
      />
      <CompletedList
        todos={completedTodos}
        clearCompleted={actions.clearCompleted}
      />
      <Sidebar
        lists={lists}
        fetchTodos={actions.fetchTodos}
        deleteList={actions.deleteList}
        addList={actions.addList}
      />
      <AddButton addTodo={actions.addTodo} />
    </div>
  );
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { todos: state.todos, lists: state.lists };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(TodoActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
