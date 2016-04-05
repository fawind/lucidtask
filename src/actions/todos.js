import gTasks from '../util/gTasks';

let nextTodoId = 0;

const getCurrentList = (lists) => lists.filter(l => l.active)[0];
const getTodo = (todos, id) => todos.filter(t => t.id === id)[0];
const getLastTodoId = (todos) => {
  if (todos.length === 0) return null;
  return todos[todos.length - 1].id;
};

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

export const updateId = (oldId, newId) => ({
  type: 'UPDATE_ID',
  oldId,
  newId,
});

export const addTodo = (title) => (dispatch, getState) => {
  const state = getState();
  const list = getCurrentList(state.lists);
  const lastTodoId = getLastTodoId(state.todos);
  const tempId = (nextTodoId++).toString();
  dispatch({ type: 'ADD_TODO', id: tempId, title });
  gTasks.addTask(list.id, title, lastTodoId)
    .then(res => dispatch({ type: 'UPDATE_ID', oldId: tempId, newId: res.id }))
    .catch(error => dispatch(apiError(error, state)));
};

export const toggleTodo = (id) => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: 'TOGGLE_TODO', id });
  const newState = getState();
  const list = getCurrentList(newState.lists);
  const todo = getTodo(newState.todos, id);
  gTasks.updateTask(list.id, todo)
    .catch(error => dispatch(apiError(error, state)));
};

export const deleteTodo = (id) => (dispatch, getState) => {
  const state = getState();
  const list = getCurrentList(state.lists);
  dispatch({ type: 'DELETE_TODO', id });
  gTasks.deleteTask(list.id, id)
    .catch(error => dispatch(apiError(error, state)));
};

export const editTodo = (id, title) => (dispatch, getState) => {
  const state = getState();
  dispatch({ type: 'EDIT_TODO', id, title });
  const newState = getState();
  const list = getCurrentList(newState.lists);
  const todo = getTodo(newState.todos, id);
  gTasks.updateTask(list.id, todo)
    .catch(error => dispatch(apiError(error, state)));
};

export const moveTodo = (id, newPreviousId) => (dispatch, getState) => {
  const state = getState();
  const list = getCurrentList(state.lists);
  dispatch({ type: 'MOVE_TODO', id, newPreviousId });
  gTasks.moveTask(list.id, id, newPreviousId)
    .catch(error => dispatch(apiError(error, state)));
};

export const clearCompleted = () => (dispatch, getState) => {
  const state = getState();
  const list = getCurrentList(state.lists);
  dispatch({ type: 'CLEAR_COMPLETED' });
  gTasks.clearTasks(list.id)
    .catch(error => dispatch(apiError(error, state)));
};

export const fetchTodos = (list) => dispatch => (
  gTasks.getTasks(list)
    .then(res => dispatch(getTodos(list, res.items)))
    .catch(error => dispatch(apiError(error, null)))
);

export const initTasks = () => dispatch => {
  gTasks.getLists()
    .then(res => {
      dispatch(getLists(res.items));
      if (res.items.length > 0) {
        dispatch(fetchTodos(res.items[0].id));
      }
    });
};
