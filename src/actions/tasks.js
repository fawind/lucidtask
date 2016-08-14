export const addTask = (id, title) => ({
  type: 'ADD_TASK',
  id,
  title,
});

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  id,
});

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  id,
});

export const editTask = (id, title) => ({
  type: 'EDIT_TASK',
  id,
  title,
});

export const moveTask = (id, newPreviousId) => ({
  type: 'MOVE_TASK',
  id,
  newPreviousId,
});

export const updateTaskId = (oldId, newId) => ({
  type: 'UPDATE_TASK_ID',
  oldId,
  newId,
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});

export const openList = (id, tasks) => ({
  type: 'OPEN_LIST',
  id,
  tasks,
});

export const closeList = () => ({
  type: 'CLOSE_LIST',
});

export const switchList = (listId, tasks) => ({
  type: 'SWITCH_LIST',
  listId,
  tasks,
});

export const addList = (id, title) => ({
  type: 'ADD_LIST',
  id,
  title,
});

export const deleteList = (id) => ({
  type: 'DELETE_LIST',
  id,
});

export const initLists = (tasklists) => ({
  type: 'INIT_LISTS',
  tasklists,
});
