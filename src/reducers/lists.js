import tasks from './tasks';

import initialState from '../initialState';

const list = (state, action) => {
  switch (action.type) {
    case 'OPEN_LIST': {
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { active: true, tasks: action.tasks });
    }
    case 'CLOSE_LIST': {
      return Object.assign({}, state, { active: false });
    }
    default: {
      if (state.active && state.tasks) {
        return tasks(state, action);
      }
      return state;
    }
  }
};

const lists = (state = initialState.lists, action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        { id: action.id, title: action.title, active: false },
      ];
    case 'DELETE_LIST':
      return state.filter(l => l.id !== action.id);
    default:
      return state.map(l => list(l, action));
  }
};

export default lists;
