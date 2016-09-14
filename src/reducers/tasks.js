import * as types from '../constants/actionTypes';

const task = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      return {
        id: action.id,
        title: action.title,
        status: 'needsAction',
      };
    case types.TOGGLE_TASK:
      if (state.id !== action.id) return state;
      if (state.status === 'completed') {
        return Object.assign({}, state, { status: 'needsAction' });
      }
      return Object.assign({}, state, { status: 'completed' });
    case types.EDIT_TASK:
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { title: action.title });
    case types.UPDATE_TASK_ID:
      if (state.id !== action.oldId) return state;
      return Object.assign({}, state, { id: action.newId });
    default:
      return state;
  }
};

const tasks = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      return [...state, task(undefined, action)];
    case types.TOGGLE_TASK:
      return state.map(t => task(t, action));
    case types.DELETE_TASK:
      return state.filter(t => t.id !== action.id);
    case types.EDIT_TASK:
      return state.map(t => task(t, action));
    case types.MOVE_TASK: {
      const newList = [...state];
      const fromIndex = newList.findIndex(t => t.id === action.id);
      if (fromIndex === -1) return state;
      const item = newList.splice(fromIndex, 1)[0];

      let toIndex = 0;
      if (action.newPreviousId) {
        toIndex = newList.findIndex(t => t.id === action.newPreviousId);
        toIndex++;
      }
      if (toIndex === -1 || toIndex > newList.length) return state;
      newList.splice(toIndex, 0, item);
      return newList;
    }
    case types.UPDATE_TASK_ID:
      return state.map(t => task(t, action));
    case types.CLEAR_COMPLETED:
      return state.filter(t => t.status !== 'completed');
    default:
      return state;
  }
};

export default tasks;
