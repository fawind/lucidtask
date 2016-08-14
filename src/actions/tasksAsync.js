import gTasks from '../util/gTasks';
import * as actions from './tasks';
import {
  getTask,
  getLastTaskId,
  getRandomId,
  getActiveList,
} from '../util/helper';

export const handleApiError = (error, oldState) => ({
  type: 'HANDLE_API_ERROR',
  error,
  oldState,
});

export const addTask = (title) => (dispatch, getState) => {
  const oldState = getState();
  const listId = getActiveList(oldState.lists).id;
  const previousTaskId = getLastTaskId(listId);
  const tempId = getRandomId();
  dispatch(actions.addTask(tempId, title));
  gTasks.addTask(listId, title, previousTaskId)
    .then(res => dispatch(actions.updateTaskId(tempId, res.id)))
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const toggleTask = (taskId) => (dispatch, getState) => {
  const oldState = getState();
  const activeList = getActiveList(oldState.lists);
  dispatch(actions.toggleTask(taskId));
  const updatedTask = getTask(activeList.tasks, taskId);
  gTasks.updateTask(activeList.id, updatedTask)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const deleteTask = (taskId) => (dispatch, getState) => {
  const oldState = getState();
  const listId = getActiveList(oldState.lists).id;
  dispatch(actions.deleteTask(taskId));
  gTasks.deleteTask(listId, taskId)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const editTask = (taskId, title) => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.editTask(taskId, title));
  const activeList = getActiveList(getState().lists);
  const updatedTask = getTask(activeList.tasks, taskId);
  gTasks.updateTask(activeList.id, updatedTask)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const moveTask = (taskId, newPreviousTaskId) => (dispatch, getState) => {
  const oldState = getState();
  const listId = getActiveList(oldState.lists).id;
  dispatch(actions.moveTask(taskId, newPreviousTaskId));
  gTasks.moveTask(listId, taskId, newPreviousTaskId)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const clearCompleted = () => (dispatch, getState) => {
  const oldState = getState();
  const listId = getActiveList(oldState.lists).id;
  dispatch(actions.clearCompleted());
  gTasks.clearTasks(listId)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const openList = (listId) => (dispatch) => {
  gTasks.getTasks(listId)
    .then(res => {
      let tasks = [];
      if (res.hasOwnProperty('items')) tasks = res.items;
      dispatch(actions.openList(listId, tasks));
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const closeList = actions.closeList;

export const addList = (title) => (dispatch) => {
  gTasks.addList(title)
    .then(res => {
      dispatch(actions.addList(res.id, title));
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const deleteList = (id) => (dispatch, getState) => {
  gTasks.deleteList(id)
    .then(() => {
      dispatch(actions.deleteList(id));
      const state = getState();
      if (state.tasklists.length > 0) dispatch(closeList());
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const initLists = () => (dispatch) => {
  gTasks.getLists()
    .then(res => {
      dispatch(actions.initLists(res.items));
    });
};
