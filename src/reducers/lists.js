import tasks from './tasks';

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
        const newTasks = tasks(state.tasks, action);
        return Object.assign({}, state, { tasks: newTasks });
      }
      return state;
    }
  }
};

const lists = (state = [], action) => {
  switch (action.type) {
    case 'API_ERROR':
      console.error(action);
      return action.state.lists;
    case 'ADD_LIST':
      return [
        ...state,
        { id: action.id, title: action.title, active: false },
      ];
    case 'DELETE_LIST':
      return state.filter(l => l.id !== action.id);
    case 'INIT_LISTS':
      return action.lists;
    default:
      return state.map(l => list(l, action));
  }
};

export default lists;
