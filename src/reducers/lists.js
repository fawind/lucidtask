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
    default:
      return state;
  }
};

export default lists;
