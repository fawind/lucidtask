import { connect } from 'react-redux';
import { toggleTodo } from '../actions';
import TodoList from '../components/TodoList';

const getOpenTodos = (todos) => todos.filter(t => !t.completed);

const mapStateToProps = (state) => ({
  todos: getOpenTodos(state.todos),
});

const mapDispatchToProps = (dispatch) => ({
  onTodoSwipeLeft: (id) => {
    dispatch(toggleTodo(id));
  },
});

const OpenTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default OpenTodoList;
