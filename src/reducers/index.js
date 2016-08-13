import { combineReducers } from 'redux';
import activeTasklist from './activeTasklist';
import tasklists from './tasklists';

export default combineReducers({
  activeTasklist,
  tasklists,
});
