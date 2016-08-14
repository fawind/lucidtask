import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tasklist from '../components/Tasklist';
import * as taskActions from '../actions/tasks.js';
import './app.css';

const App = ({ lists, actions }) => {
  return (
    <Tasklist lists={lists} actions={actions} />
  );
};

App.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(taskActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
