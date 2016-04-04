const todo = (state, action) => {
  switch (action.type) {
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

const initialState = [
  { id: '1', title: 'Test toDo', status: 'needsAction' },
  { id: '2', title: 'Finish App', status: 'needsAction' },
  { id: '3', title: 'Style this shit', status: 'needsAction' },
  { id: '4', title: 'lowb', status: 'needsAction' },
];

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action),
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.id);
    case 'EDIT_TODO':
      return state.map(t => todo(t, action));
    case 'MOVE_TODO': {
      const newList = [...state];
      const item = newList.splice(action.fromIndex, 1)[0];
      newList.splice(action.toIndex, 0, item);
      return newList;
    }
    case 'CLEAR_COMPLETED': {
      return state.filter(t => t.status !== 'completed');
    }
    default:
      return state;
  }
};

export default todos;
