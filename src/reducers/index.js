import { combineReducers } from 'redux';
import todos from './todos';
import lists from './lists';

const todoApp = combineReducers({ todos, lists });

export default todoApp;
