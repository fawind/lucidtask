import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import todoApp from './reducers';
import App from './containers/App';
import { checkAuth } from './actions/auth';

const store = createStore(todoApp,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
// window.onload = () => store.dispatch(checkAuth());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
