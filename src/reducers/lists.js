const list = (state, action) => {
  switch (action.type) {
    case 'GET_TODOS':
      if (state.id !== action.list) {
        return Object.assign({}, state, { active: false });
      }
      return Object.assign({}, state, { active: true });
    default:
      return state;
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case 'GET_LISTS':
      return action.lists;
    case 'GET_TODOS':
      return state.map(l => list(l, action));
    case 'ADD_LIST':
      return [
        ...state,
        { id: action.id, title: action.title, active: false },
      ];
    case 'DELETE_LIST':
      return state.filter(l => l.id !== action.id);
    default:
      return state;
  }
};

export default lists;
