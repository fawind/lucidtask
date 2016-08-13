const tasklists = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        { id: action.id, title: action.title, active: false },
      ];
    case 'DELETE_LIST':
      return state.filter(l => l.id !== action.id);
    case 'INIT_LISTS':
      return action.tasklists;
    default:
      return state;
  }
};

export default tasklists;
