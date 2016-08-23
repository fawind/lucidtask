import tasks from './tasks';
import * as types from '../constants/actionTypes';

const logError = (error) => {
  console.log(`${error.code}: ${error.message}`, error);
};

const list = (state, action) => {
  switch (action.type) {
    case types.OPEN_LIST: {
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { active: true, tasks: action.tasks });
    }
    case types.CLOSE_LIST: {
      return Object.assign({}, state, { active: false });
    }
    default: {
      if (state.active && state.tasks) {
        const newTasks = tasks(state.tasks, action);
        return Object.assign({}, state, { tasks: newTasks });
      }
      return state;
    }
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case types.HANDLE_API_ERROR:
      logError(action.error);
      return action.oldState.lists;
    case types.ADD_LIST:
      return [
        ...state,
        { id: action.id, title: action.title, active: false },
      ];
    case types.DELETE_LIST:
      return state.filter(l => l.id !== action.id);
    case types.INIT_LISTS:
      return action.lists;
    default:
      return state.map(l => list(l, action));
  }
};

export default lists;
