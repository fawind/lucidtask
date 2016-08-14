import React, { Component, PropTypes } from 'react';
import FlipMove from 'react-flip-move';
import Reorder from 'react-reorder';
import ListItem from '../ListItem';
import TaskItem from '../TaskItem';
import './styles.css';

export default class Tasklist extends Component {

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
    console.log(activeList.tasks);
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
      <Reorder
        key="listitem"
        itemKey="id"
        lock="horizontal"
        holdTime="500"
        list={activeList.tasks}
        template={TaskItem}
        itemClass="item task"
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

Tasklist.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
