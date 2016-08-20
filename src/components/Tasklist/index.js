import React, { Component, PropTypes } from 'react';
import Reorder from '../Reorder';
import TaskItem from '../TaskItem';
import CompletedTasklist from '../CompletedTasklist';

export default class Tasklist extends Component {
  constructor(props, context) {
    super(props, context);
    this.itemMoved = this.itemMoved.bind(this);
    this.itemSwipedOut = this.itemSwipedOut.bind(this);
    this.openTasks = Object.assign({}, this.props.openTasks);
  }

  itemClicked(e, item) {
    const _item = item;
    _item.edit = true;
  }

  itemMoved(e, item, from, to) {
    if (from === to) return;
    const previousTaskId = this.openTasks[to].id;
    this.props.actions.moveTask(item.id, previousTaskId);
  }

  itemSwipedOut(e, item) {
    this.props.actions.toggleTask(item.id);
  }

  render() {
    return (
      <div>
        <Reorder
          key="listitem"
          itemKey="id"
          lock="auto"
          holdTime="500"
          list={this.props.openTasks}
          template={TaskItem}
          itemClass="taskContainer"
          itemClicked={this.itemClicked}
          swipeOut={this.itemSwipedOut}
          callback={this.itemMoved}
          sharedProps={{
            editTask: this.props.actions.editTask,
          }}
        />
        <CompletedTasklist
          tasks={this.props.completedTasks}
          deleteTask={this.props.actions.deleteTask}
          clearCompleted={this.props.actions.clearCompleted}
        />
      </div>
    );
  }
}

Tasklist.propTypes = {
  openTasks: PropTypes.array.isRequired,
  completedTasks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};
