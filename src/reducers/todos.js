const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { completed: !state.completed });
    case 'EDIT_TODO':
      if (state.id !== action.id) return state;
      return Object.assign({}, state, { text: action.text });
    default:
      return state;
  }
};

const initialState = [
  { id: 1, text: 'Test toDo', completed: false },
  { id: 2, text: 'Finish App', completed: false },
  { id: 3, text: 'Style this shit', completed: false },
  { id: 4, text: 'lowb', completed: false },
];

const todos = (state = initialState, action) => {
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
    default:
      return state;
  }
};

export default todos;
