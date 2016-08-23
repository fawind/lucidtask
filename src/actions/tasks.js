import * as types from '../constants/actionTypes';

export const addTask = (id, title) => ({
  type: types.ADD_TASK,
  id,
  title,
});

export const toggleTask = (id) => ({
  type: types.TOGGLE_TASK,
  id,
});

export const deleteTask = (id) => ({
  type: types.DELETE_TASK,
  id,
});

export const editTask = (id, title) => ({
  type: types.EDIT_TASK,
  id,
  title,
});

export const moveTask = (id, newPreviousId) => ({
  type: types.MOVE_TASK,
  id,
  newPreviousId,
});

export const updateTaskId = (oldId, newId) => ({
  type: types.UPDATE_TASK_ID,
  oldId,
  newId,
});

export const clearCompleted = () => ({
  type: types.CLEAR_COMPLETED,
});

export const openList = (id, tasks) => ({
  type: types.OPEN_LIST,
  id,
  tasks,
});

export const closeList = () => ({
  type: types.CLOSE_LIST,
});

export const addList = (id, title) => ({
  type: types.ADD_LIST,
  id,
  title,
});

export const deleteList = (id) => ({
  type: types.DELETE_LIST,
  id,
});

export const initLists = (lists) => ({
  type: types.INIT_LISTS,
  lists,
});


export const handleApiError = (error, oldState) => ({
  type: types.HANDLE_API_ERROR,
  error,
  oldState,
});
