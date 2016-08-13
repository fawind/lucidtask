import gTasks from '../util/gTasks';
import * as actions from './tasks';
import {
  getTask,
  getLastTaskId,
  getRandomId,
} from '../util/helper';

export const handleApiError = (error, oldState) => ({
  type: 'HANDLE_API_ERROR',
  error,
  oldState,
});

export const addTask = (title) => (dispatch, getState) => {
  const oldState = getState();
  const previousTaskId = getLastTaskId(oldState.activeTasklist.tasks);
  const tempId = getRandomId();
  dispatch(actions.addTask(tempId, title));
  gTasks.addTask(oldState.activeTasklist.id, title, previousTaskId)
    .then(res => dispatch(actions.updateTaskId(tempId, res.id)))
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const toggleTask = (taskId) => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.toggleTask(taskId));
  const updatedTask = getTask(getState().activeTasklist.tasks, taskId);
  gTasks.updateTask(oldState.activeTasklist.id, updatedTask)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const deleteTask = (taskId) => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.deleteTask(taskId));
  gTasks.deleteTask(oldState.activeTasklist.id, taskId)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const editTask = (taskId, title) => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.editTask(taskId, title));
  const updatedTask = getTask(getState().activeTasklist.tasks, taskId);
  gTasks.updateTask(oldState.activeTasklist.id, updatedTask)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const moveTask = (taskId, newPreviousTaskId) => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.moveTask(taskId, newPreviousTaskId));
  gTasks.moveTask(oldState.activeTasklist.id, taskId, newPreviousTaskId)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const clearCompleted = () => (dispatch, getState) => {
  const oldState = getState();
  dispatch(actions.clearCompleted());
  gTasks.clearTasks(oldState.activeTasklist.id)
    .catch(error => dispatch(handleApiError(error, oldState)));
};

export const switchList = (listId) => (dispatch) => {
  gTasks.getTasks(listId)
    .then(res => {
      let tasks = [];
      if (res.hasOwnProperty('items')) tasks = res.items;
      dispatch(actions.switchList(listId, tasks));
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const addList = (title) => (dispatch) => {
  gTasks.addList(title)
    .then(res => {
      dispatch(actions.addList(res.id, title));
      dispatch(switchList(res.id));
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const deleteList = (id) => (dispatch, getState) => {
  gTasks.deleteList(id)
    .then(() => {
      dispatch(actions.deleteList(id));
      const state = getState();
      if (state.tasklists.length > 0) dispatch(switchList(state.tasklists[0].id));
    })
    .catch(error => dispatch(handleApiError(error, null)));
};

export const initLists = () => (dispatch) => {
  gTasks.getLists()
    .then(res => {
      dispatch(actions.initLists(res.items));
      if (res.items.length > 0) dispatch(switchList(res.items[0].id));
    });
};
