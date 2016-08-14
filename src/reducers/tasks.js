const task = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        id: action.id,
        title: action.title,
        status: 'needsAction',
      };
    case 'TOGGLE_TASK':
      if (state.id !== action.id) return state;
      if (state.status === 'completed') {
        return Object.assign({}, state, { status: 'needsAction' });
      }
      return Object.assign({}, state, { status: 'completed' });
    case 'EDIT_TASK':
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { title: action.title });
    case 'UPDATE_TASK_ID':
      if (state.id !== action.oldId) return state;
      return Object.assign({}, state, { id: action.newId });
    default:
      return state;
  }
};

const tasks = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, task(undefined, action)];
    case 'TOGGLE_TASK':
      return state.map(t => task(t, action));
    case 'DELETE_TASK':
      return state.filter(t => t.id !== action.id);
    case 'EDIT_TASK':
      return state.map(t => task(t, action));
    case 'MOVE_TASK': {
      const newList = [...state];
      const fromIndex = state.findIndex(t => t.id === action.id);
      const toIndex = state.findIndex(t => t.id === action.newPreviousId);
      const item = newList.splice(fromIndex, 1)[0];
      newList.splice(toIndex, 0, item);
      return newList;
    }
    case 'UPDATE_TASK_ID':
      return state.map(t => task(t, action));
    case 'CLEAR_COMPLETED':
      return state.filter(t => t.status !== 'completed');
    default:
      return state;
  }
};

export default tasks;
