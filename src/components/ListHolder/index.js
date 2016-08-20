import React, { Component, PropTypes } from 'react';
import chroma from 'chroma-js';
import FlipMove from 'react-flip-move';
import ListItem from '../ListItem';
import Tasklist from '../Tasklist';
import AddButton from '../AddButton';
import './styles.css';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

export default class ListHolder extends Component {

  getActiveList() {
    const activeList = this.props.lists.filter(l => l.active);
    if (activeList.length === 0) return null;
    return activeList[0];
  }

  getOpenTasks(tasks) {
    const openTasks = tasks.filter(t => t.status !== 'completed');
    return this.initTasks(openTasks);
  }

  getCompletedTasks(tasks) {
    return tasks.filter(t => t.status === 'completed');
  }

  initTasks(tasks) {
    const total = tasks.length;
    return tasks.map((task, index) => {
      const color = colorScale(index / total).hex();
      return Object.assign({}, task, { color, edit: false });
    });
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
    const openTasks = this.getOpenTasks(activeList.tasks);
    const completedTasks = this.getCompletedTasks(activeList.tasks);
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
        key={'tasklist: $(activeList.id)'}
        openTasks={openTasks}
        completedTasks={completedTasks}
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

  renderButton() {
    const activeList = this.getActiveList();
    return (
      <AddButton
        addList={this.props.actions.addList}
        addTask={this.props.actions.addTask}
        listViewActive={!activeList}
      />
    );
  }

  render() {
    return (
      <div>
        <FlipMove>
          {this.renderListElements()}
        </FlipMove>
        {this.renderButton()}
      </div>
    );
  }
}

ListHolder.propTypes = {
  lists: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
