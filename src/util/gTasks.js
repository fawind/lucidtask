import config from '../../config';

/* === Authentication === */

const _taskApiLoaded = () => console.log('Task API loaded!');

const _loadTasksApi = () => {
  gapi.client.load('tasks', 'v1', _taskApiLoaded);
};

const _handleAuthResult = (response) => {
  if (response && !response.error) {
    _loadTasksApi();
  } else {
    _authorize(); // eslint-disable-line no-use-before-define
  }
};

const _authorize = () => {
  const body = { client_id: config.CLIENT_ID, scope: config.SCOPES, immediate: false };
  gapi.auth.authorize(body, _handleAuthResult);
};

const checkAuth = () => {
  const body = { client_id: config.CLIENT_ID, scope: config.SCOPES.join(' '), immediate: true };
  gapi.auth.authorize(body, _handleAuthResult);
};

/* === Tasks API === */

const _executeRequest = (request) => (
  new Promise((resolve, reject) => {
    request.execute(response => {
      if (response.error) {
        reject(response);
      } else {
        resolve(response);
      }
    });
  })
);

const getTasks = (taskList) => {
  const body = { taskList };
  const request = gapi.client.tasks.tasks.list(body);
  return _executeRequest(request);
};

const addTask = (taskList, title, previousId = null) => {
  const body = { taskList, title };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.insert(body);
  return _executeRequest(request);
};

const deleteTask = (taskList, taskId) => {
  const body = { taskList, task: taskId };
  const request = gapi.client.tasks.tasks.delete(body);
  return _executeRequest(request);
};

const updateTask = (taskList, task) => {
  const body = { taskList, status, task: task.id, id: task.id, title: task.title };
  const request = gapi.client.tasks.tasks.update(body);
  return _executeRequest(request);
};

const moveTask = (taskList, taskId, previousId = null) => {
  const body = { taskList, task: taskId };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.move(body);
  return _executeRequest(request);
};

const clearTasks = (taskList) => {
  const body = { taskList };
  const request = gapi.client.tasks.tasks.clear(body);
  return _executeRequest(request);
};

const getLists = () => {
  const request = gapi.client.tasks.tasklists.list();
  return _executeRequest(request);
};

const addList = (title) => {
  const body = { title };
  const request = gapi.client.tasks.tasklists.insert(body);
  return _executeRequest(request);
};

const deleteList = (taskList) => {
  const body = { taskList };
  const request = gapi.client.tasks.taskLists.delete(body);
  return _executeRequest(request);
};

export default {
  checkAuth,
  getTasks,
  updateTask,
  deleteTask,
  moveTask,
  addTask,
  clearTasks,
  getLists,
  addList,
  deleteList,
};
