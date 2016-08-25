import config from '../../config';

const LOGIN_REQUIRED = 401;

/* === Authentication === */

const _handleResponse = (response, resolve, reject) => {
  if (response && !response.error) {
    resolve(response);
  } else {
    reject(response);
  }
};

const loadTasksApi = () => (
  new Promise(resolve =>
    gapi.client.load('tasks', 'v1', () => resolve())
  ));

const authorize = () => {
  const body = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES.join(' '),
    immediate: false,
  };
  return new Promise((resolve, reject) => (
    gapi.auth.authorize(body, response =>
     _handleResponse(response, resolve, reject))));
};

const checkAuth = () => {
  const body = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES.join(' '),
    immediate: true,
  };
  return new Promise((resolve, reject) => (
    gapi.auth.authorize(body, response =>
      _handleResponse(response, resolve, reject))));
};

/* === Tasks API === */

/**
 * Refresh the session and retry a request.
 * @param {function} request - Request to retry.
 * @param {function} resolve - Callback to be called on successfull retry
 * @param {function} reject - Callback to be called on failed sesison refresh.
 * @return {Promise} Request promise.
 */
const _refreshAuthAndRetry = (request, resolve, reject) => {
  checkAuth()
    .then(() => ( // eslint-disable-next-line no-use-before-define
      _executeRequest(request)
        .then((response) => resolve(response))
        .catch((response) => reject(response))
    ))
    .catch((response) => {
      reject(response);
    });
};

/**
 * Execute a request.
 * @param {function} request - Google api request to execute.
 * @return {Promise} Request promise.
 */
const _executeRequest = (request) => (
  new Promise((resolve, reject) => {
    request.execute(response => {
      if (response.error) {
        if (response.error === LOGIN_REQUIRED) {
          _refreshAuthAndRetry(request, resolve, reject);
        } else {
          reject(response);
        }
      } else {
        resolve(response);
      }
    });
  })
);

/**
 * Get all tasks of a tasklist.
 * @param {string} tasklist - Tasklist id.
 * @return {Promise} Request promise.
 */
const getTasks = (tasklist) => {
  const body = { tasklist };
  const request = gapi.client.tasks.tasks.list(body);
  return _executeRequest(request);
};

/**
 * Add a new task to a tasklist.
 * @param {string} tasklist - Tasklist to add the task to.
 * @param {string} title - Title of the task.
 * @param {string} [previousId] - Task id of the previous task in the list.
 * @return {Promise} Request promise.
 */
const addTask = (tasklist, title, previousId = null) => {
  const body = { tasklist, title };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.insert(body);
  return _executeRequest(request);
};

/**
 * Delete a task.
 * @param {string} tasklist - Tasklist of the task to delete.
 * @param {string} taskId - Id of the task to delete.
 * @return {Promise} Request promise.
 */
const deleteTask = (tasklist, taskId) => {
  const body = { tasklist, task: taskId };
  const request = gapi.client.tasks.tasks.delete(body);
  return _executeRequest(request);
};

/**
 * Update the id, title, or status of a task.
 * @param {string} tasklist - Tasklist of the task to update.
 * @param {Object} task - New task object.
 * @return {Promise} Request promise.
 */
const updateTask = (tasklist, task) => {
  const body = { tasklist, task: task.id, id: task.id, title: task.title, status: task.status };
  const request = gapi.client.tasks.tasks.update(body);
  return _executeRequest(request);
};

/**
 * Move the task in the list.
 * @param {string} tasklist - Tasklist of the task to move.
 * @param {string} taskId - Id of the task to move.
 * @param {string} [previousId] - Id of the new previous task.
 * @return {Promise} Request promise.
 */
const moveTask = (tasklist, taskId, previousId = null) => {
  const body = { tasklist, task: taskId };
  if (previousId) body.previous = previousId;
  const request = gapi.client.tasks.tasks.move(body);
  return _executeRequest(request);
};

/**
 * Delete all done tasks of a list.
 * @param {string} tasklist - Tasklist to clear all tasks in.
 * @return {Promise} Request promise.
 */
const clearTasks = (tasklist) => {
  const body = { tasklist };
  const request = gapi.client.tasks.tasks.clear(body);
  return _executeRequest(request);
};

/**
 * Get all tasklists of the user.
 * @return {Promise} Request promise.
 */
const getLists = () => {
  const request = gapi.client.tasks.tasklists.list();
  return _executeRequest(request);
};

/**
 * Create a new tasklist.
 * @param {string} title - Title of the new tasklist.
 * @return {Promise} Request promise.
 */
const addList = (title) => {
  const body = { title };
  const request = gapi.client.tasks.tasklists.insert(body);
  return _executeRequest(request);
};

/**
 * Delete a tasklist.
 * @param {string} tasklist - Id of the tasklist to delete.
 * @return {Promise} Request promise.
 */
const deleteList = (tasklist) => {
  const body = { tasklist };
  const request = gapi.client.tasks.tasklists.delete(body);
  return _executeRequest(request);
};

export default {
  // Auth
  authorize,
  loadTasksApi,
  checkAuth,
  // Tasks
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
