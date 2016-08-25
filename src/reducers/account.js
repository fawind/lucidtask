import * as types from '../constants/actionTypes';

const account = (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case types.INIT_LISTS:
      return Object.assign({}, state, { loggedIn: true });
    default:
      return state;
  }
};

export default account;
