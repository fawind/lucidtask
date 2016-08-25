import gTasks from '../util/gTasks';
import { initLists } from './tasksAsync.js';
import { handleApiError } from './tasks.js';

export const loadTasksApi = () => dispatch => {
  gTasks.loadTasksApi()
    .then(() => dispatch(initLists()))
    .catch(res => {
      console.log(res);
      dispatch(handleApiError(res));
    });
};

const authorize = (dispatch) => {
  // Show the oauth window
  gTasks.authorize()
    .then(() => dispatch(loadTasksApi()))
    .catch(res => dispatch(handleApiError(res)));
};

export const checkAuth = () => dispatch => {
  gTasks.checkAuth()
    .then(() => dispatch(loadTasksApi()))
    .catch(() => authorize(dispatch));
};
