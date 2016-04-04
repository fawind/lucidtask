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

const getTasks = (tasklist) => {
  const body = { tasklist };
  const request = gapi.client.tasks.tasks.list(body);
  return _executeRequest(request);
};

const addTask = (tasklist, title, previousId = null) => {
  const body = { tasklist, title };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.insert(body);
  return _executeRequest(request);
};

const deleteTask = (tasklist, taskId) => {
  const body = { tasklist, task: taskId };
  const request = gapi.client.tasks.tasks.delete(body);
  return _executeRequest(request);
};

const updateTask = (tasklist, task) => {
  const body = { tasklist, status, task: task.id, id: task.id, title: task.title };
  const request = gapi.client.tasks.tasks.update(body);
  return _executeRequest(request);
};

const moveTask = (tasklist, taskId, previousId = null) => {
  const body = { tasklist, task: taskId };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.move(body);
  return _executeRequest(request);
};

const clearTasks = (tasklist) => {
  const body = { tasklist };
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

const deleteList = (tasklist) => {
  const body = { tasklist };
  const request = gapi.client.tasks.tasklists.delete(body);
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
