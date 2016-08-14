import React, { Component, PropTypes } from 'react';
import Reorder from 'react-reorder';
import chroma from 'chroma-js';
import TaskItem from '../TaskItem';
import CompletedItem from '../CompletedItem';

const colorScale = chroma.scale(['#F44336', '#FFD54F']);

export default class Tasklist extends Component {
  getOpenTasks() {
    const openTasks = this.props.tasks.filter(t => t.status !== 'completed');
    return this.initItems(openTasks);
  }

  getCompletedTasks() {
    return this.props.tasks.filter(t => t.status === 'completed');
  }

  initItems(tasks) {
    const total = tasks.length;
    return tasks.map((task, index) => {
      const color = colorScale(index / total).hex();
      return Object.assign(
        {},
        task,
        { color, edit: false, actions: false }
      );
    });
  }

  itemClicked(e, item) {
    const _item = item;
    _item.edit = true;
  }

  render() {
    return (
      <div>
        <Reorder
          key="listitem"
          itemKey="id"
          lock="horizontal"
          holdTime="500"
          list={this.getOpenTasks()}
          itemClicked={this.itemClicked}
          template={TaskItem}
          itemClass="taskContainer"
        />
        {this.getCompletedTasks().map(task => (
          <CompletedItem item={task} key={task.id} />
        ))}
      </div>
    );
  }
}

Tasklist.propTypes = {
  tasks: PropTypes.array.isRequired,
};
