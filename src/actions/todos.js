import gTasks from '../util/gTasks';

let nextTodoId = 0;

export const apiError = (error, oldState) => ({
  type: 'API_ERROR',
  error,
  oldState,
});

export const getTodos = (list, todos) => ({
  type: 'GET_TODOS',
  list,
  todos,
});

export const getLists = (lists) => ({
  type: 'GET_LISTS',
  lists,
});

export const addTodo = (title) => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  title,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});

export const editTodo = (id, title) => ({
  type: 'EDIT_TODO',
  id,
  title,
});

export const moveTodo = (fromIndex, toIndex) => ({
  type: 'MOVE_TODO',
  fromIndex,
  toIndex,
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});

export const fetchTodos = (list) => dispatch => (
  gTasks.getTasks(list)
    .then(
      res => dispatch(getTodos(list, res.items)),
      err => dispatch(apiError(err))
   )
);

export const initTasks = () => dispatch => {
  gTasks.getLists()
    .then(res => {
      dispatch(getLists(res.items));
      if (res.items.length > 0) {
        dispatch(fetchTodos(res.items[0].id));
        return;
      }
    });
};
