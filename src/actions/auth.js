import config from '../../config';
import gTasks from '../util/gTasks';
import * as types from '../constants/actionTypes';
import { initLists } from './tasksAsync.js';
import { handleApiError } from './tasks.js';

export const signIn = () => gapi.auth2.getAuthInstance().signIn();
export const signOut = () => gapi.auth2.getAuthInstance().signOut();

export const signedIn = () => ({ type: types.SIGNED_IN });
export const signedOut = () => ({ type: types.SIGNED_OUT });

/**
 * Load gTasks Api and fetch task lists on success.
 */
export const loadTasksApi = () => dispatch => {
  gTasks.loadTasksApi()
    .then(() => dispatch(initLists()))
    .catch(res => {
      console.log(res);
      dispatch(handleApiError(res));
    });
};

/**
 * Triggered when the sing in status changes.
 */
export const updateSignInStatus = (isSignedIn, dispatch) => {
  if (isSignedIn) {
    dispatch(loadTasksApi());
    dispatch(signedIn());
  } else {
    dispatch(signedOut());
  }
};

/**
 * Init authentication and check initial sign in.
 */
export const initAuth = () => dispatch => {
  const initPromise = gapi.auth2.init({
    client_id: config.CLIENT_ID,
    scope: config.SCOPES.join(' '),
    immediate: true,
  });

  initPromise.then(() => {
    // Set up sign in listener.
    gapi.auth2.getAuthInstance()
      .isSignedIn
      .listen((isSignedIn) => updateSignInStatus(isSignedIn, dispatch));
    // Check initial sign in.
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    updateSignInStatus(isSignedIn, dispatch);
  });
};
