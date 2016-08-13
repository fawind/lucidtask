import config from '../../config';
import { initLists } from './tasksAsync.js';

export const loadTasksApi = () => dispatch => {
  gapi.client.load('tasks', 'v1', () => {
    dispatch(initLists());
  });
};

const authorize = (dispatch) => {
  // Show the oauth window
  const body = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES.join(' '),
    immediate: false,
  };
  gapi.auth.authorize(body, res => {
    if (res && !res.error) {
      dispatch(loadTasksApi());
    } else {
      console.log('Auth error:', res);
    }
  });
};

export const checkAuth = () => dispatch => {
  const body = {
    client_id: config.CLIENT_ID,
    scope: config.SCOPES.join(' '),
    immediate: true,
  };
  gapi.auth.authorize(body, res => {
    if (res && !res.error) {
      dispatch(loadTasksApi());
    } else {
      authorize(dispatch);
    }
  });
};
