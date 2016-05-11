const todo = (state, action) => {
  switch (action.type) {
    case 'UPDATE_ID':
      if (state.id !== action.oldId) return state;
      return Object.assign({}, state, { id: action.newId });
    case 'ADD_TODO':
      return {
        id: action.id,
        title: action.title,
        status: 'needsAction',
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state;
      if (state.status === 'completed') {
        return Object.assign({}, state, { status: 'needsAction' });
      }
      return Object.assign({}, state, { status: 'completed' });
    case 'EDIT_TODO':
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { title: action.title });
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'GET_TODOS':
      return action.todos;
    case 'UPDATE_ID':
      return state.map(t => todo(t, action));
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.id);
    case 'EDIT_TODO':
      return state.map(t => todo(t, action));
    case 'MOVE_TODO': {
      const newList = [...state];
      const fromIndex = state.findIndex(t => t.id === action.id);
      const toIndex = state.findIndex(t => t.id === action.newPreviousId);
      const item = newList.splice(fromIndex, 1)[0];
      newList.splice(toIndex, 0, item);
      return newList;
    }
    case 'CLEAR_COMPLETED':
      return state.filter(t => t.status !== 'completed');
    case 'API_ERROR':
      console.log(action);
      return action.oldState.todos;
    default:
      return state;
  }
};

export default todos;
