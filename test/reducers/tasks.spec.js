import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer from '../../src/reducers/tasks';
import * as actions from '../../src/actions/tasks';

const mockState = [
  { id: 1, title: 'Task1', status: 'needsAction' },
  { id: 2, title: 'Task2', status: 'needsAction' },
  { id: 3, title: 'Task3', status: 'completed' },
];
deepFreeze(mockState);

describe('task reducer', () => {
  describe('should handle ADD_TODO', () => {
    it('given empty list', () => {
      const state = [];
      deepFreeze(state);
      expect(reducer(state, actions.addTask(1, 'New Task')))
        .toEqual([{ id: 1, title: 'New Task', status: 'needsAction' }]);
    });

    it('given existing list', () => {
      expect(reducer(mockState, actions.addTask(4, 'New Task')))
        .toEqual([
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
          { id: 4, title: 'New Task', status: 'needsAction' },
        ]);
    });
  });

  describe('should handle TOGGLE_TASK', () => {
    it('should complete an open task', () => {
      expect(reducer(mockState, actions.toggleTask(2)))
        .toEqual([
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'completed' },
          { id: 3, title: 'Task3', status: 'completed' },
        ]);
    });

    it('should open a closed task', () => {
      expect(reducer(mockState, actions.toggleTask(3)))
        .toEqual([
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'needsAction' },
        ]);
    });

    it('should not fail on invalid id', () => {
      expect(reducer(mockState, actions.toggleTask(-1)))
        .toEqual(mockState);
    });
  });

  describe('should handle DELETE_TASK', () => {
    it('should delete a task by id', () => {
      expect(reducer(mockState, actions.deleteTask(1)))
        .toEqual([
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
        ]);
    });

    it('should not fail on invalid id', () => {
      expect(reducer(mockState, actions.deleteTask(-1)))
        .toEqual(mockState);
    });
  });

  describe('should handle EDIT_TASK', () => {
    it('should edit the task title', () => {
      expect(reducer(mockState, actions.editTask(1, 'Edited')))
        .toEqual([
          { id: 1, title: 'Edited', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
        ]);
    });

    it('should not fail on invalid id', () => {
      expect(reducer(mockState, actions.editTask(-1)))
        .toEqual(mockState);
    });
  });

  describe('should handle MOVE_TASK', () => {
    it('should move a task down', () => {
      expect(reducer(mockState, actions.moveTask(1, 2)))
        .toEqual([
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
        ]);
    });

    it('should move a task up', () => {
      expect(reducer(mockState, actions.moveTask(3, 2)))
        .toEqual([
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
          { id: 2, title: 'Task2', status: 'needsAction' },
        ]);
    });

    it('should move a task to the bottom', () => {
      expect(reducer(mockState, actions.moveTask(1, 3)))
        .toEqual([
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
          { id: 1, title: 'Task1', status: 'needsAction' },
        ]);
    });

    it('should move a task to the top when no to-Id is given', () => {
      expect(reducer(mockState, actions.moveTask(3)))
        .toEqual([
          { id: 3, title: 'Task3', status: 'completed' },
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
        ]);
    });

    it('should should not fail on invalid ids', () => {
      expect(reducer(mockState, actions.moveTask(4)))
        .toEqual(mockState);
    });
  });

  describe('should handle UPDATE_TASK_ID', () => {
    it('should update a task id', () => {
      expect(reducer(mockState, actions.updateTaskId(1, 5)))
        .toEqual([
          { id: 5, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
          { id: 3, title: 'Task3', status: 'completed' },
        ]);
    });

    it('should not fail on invalid ids', () => {
      expect(reducer(mockState, actions.updateTaskId(-1, 10)))
        .toEqual(mockState);
    });
  });

  describe('should handle CLEAR_COMPLETED', () => {
    it('should delete all completed tasks', () => {
      expect(reducer(mockState, actions.clearCompleted()))
        .toEqual([
          { id: 1, title: 'Task1', status: 'needsAction' },
          { id: 2, title: 'Task2', status: 'needsAction' },
        ]);
    });
  });
});
