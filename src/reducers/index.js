import { combineReducers } from 'redux';
import lists from './lists';
import account from './account';

export default combineReducers({
  lists,
  account,
});
