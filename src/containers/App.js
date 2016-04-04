import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TodoList from '../components/TodoList';
import CompletedList from '../components/CompletedList';
import AddButton from '../components/AddButton';
import * as TodoActions from '../actions';
import './app.css';

const App = ({ todos, actions }) => {
  const openTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  return (
    <div>
      <TodoList
        todos={openTodos}
        actions={actions}
      />
      <CompletedList
        todos={completedTodos}
        clearCompleted={actions.clearCompleted}
      />
      <AddButton addTodo={actions.addTodo} />
    </div>
  );
};

App.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(TodoActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
