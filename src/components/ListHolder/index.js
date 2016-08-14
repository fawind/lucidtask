import React, { Component, PropTypes } from 'react';
import FlipMove from 'react-flip-move';
import ListItem from '../ListItem';
import Tasklist from '../Tasklist';
import './styles.css';

export default class ListHolder extends Component {

  getActiveList() {
    const activeList = this.props.lists.filter(l => l.active);
    if (activeList.length === 0) return null;
    return activeList[0];
  }

  renderLists() {
    return this.props.lists.map(list => (
      <ListItem
        {...list}
        closeList={this.props.actions.closeList}
        openList={this.props.actions.openList}
        key={list.id}
      />
    ));
  }

  renderTasks(activeList) {
    const view = [];
    view.push(
      <ListItem
        {...activeList}
        closeList={this.props.actions.closeList}
        openList={this.props.actions.openList}
        key={activeList.id}
      />
    );
    view.push(
      <Tasklist
        key={'tasklist:' + activeList.id}
        tasks={activeList.tasks}
        actions={this.props.actions}
      />
    );
    return view;
  }

  renderListElements() {
    const activeList = this.getActiveList();
    if (!activeList) return this.renderLists();
    return this.renderTasks(activeList);
  }

  render() {
    return (
      <FlipMove>
        { this.renderListElements() }
      </FlipMove>
    );
  }
}

ListHolder.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
