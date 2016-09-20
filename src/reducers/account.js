import * as types from '../constants/actionTypes';

const account = (state = { loggedIn: true }, action) => {
  switch (action.type) {
    case types.SIGNED_IN:
      return Object.assign({}, state, { loggedIn: true });
    case types.SIGNED_OUT:
      return Object.assign({}, state, { loggedIn: false });
    default:
      return state;
  }
};

export default account;
