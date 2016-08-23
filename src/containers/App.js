import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ListHolder from '../components/ListHolder';
import * as taskActions from '../actions/tasksAsync.js';
import './app.css';

const App = ({ lists, actions }) => (
  <div className="listHolder">
    <ListHolder lists={lists} actions={actions} />
  </div>
);

App.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequied,
    title: PropTypes.string.isRequied,
    active: PropTypes.bool,
  })).isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    lists: state.lists,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(taskActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
