import expect from 'expect';
import deepFreeze from 'deep-freeze';
import todos from '../../src/reducers/todos';
import * as actions from '../../src/actions';

describe('todos reducer', () => {
  it('should handle initial state', () => {
    expect(todos(undefined, {})).toEqual([]);
  });

  it('should handle ADD_TODO', () => {
    const emptyState = [];
    deepFreeze(emptyState);
    expect(todos(emptyState, actions.addTodo('New Todo')))
      .toEqual([{ title: 'New Todo', status: 'needsAction', id: '1' }]);

    const stateA = [{ title: 'First Todo', status: 'needsAction', id: '1' }];
    deepFreeze(stateA);
    expect(todos(stateA, actions.addTodo('Next Todo')))
      .toEqual([
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Next Todo', status: 'needsAction', id: '2' },
      ]);

    const stateB = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
    ];
    deepFreeze(stateB);
    expect(todos(stateB, actions.addTodo('Another Todo')))
      .toEqual([
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Second Todo', status: 'needsAction', id: '2' },
        { title: 'Another Todo', status: 'needsAction', id: '3' },
      ]);
  });

  it('should handle TOGGLE_TODO', () => {
    const stateA = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.toggleTodo('4')))
      .toEqual(stateA);
    expect(todos(stateA, actions.toggleTodo('1')))
      .toEqual([
        { title: 'First Todo', status: 'completed', id: '1' },
        { title: 'Second Todo', status: 'needsAction', id: '2' },
      ]);
    expect(todos(stateA, actions.toggleTodo('2')))
      .toEqual([
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Second Todo', status: 'completed', id: '2' },
      ]);

    const stateB = [
      { title: 'First Todo', status: 'completed', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
    ];
    deepFreeze(stateB);
    expect(todos(stateB, actions.toggleTodo('1')))
      .toEqual([
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Second Todo', status: 'needsAction', id: '2' },
      ]);
  });

  it('should handle DELETE_TODO', () => {
    const stateA = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.deleteTodo('4')))
      .toEqual(stateA);
    expect(todos(stateA, actions.deleteTodo('1')))
      .toEqual([{ title: 'Second Todo', status: 'needsAction', id: '2' }]);
    expect(todos(stateA, actions.deleteTodo('2')))
      .toEqual([{ title: 'First Todo', status: 'needsAction', id: '1' }]);

    const stateB = [];
    deepFreeze(stateB);
    expect(todos(stateB, actions.deleteTodo('1')))
      .toEqual([]);
  });

  it('should handle EDIT_TODO', () => {
    const stateA = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.editTodo('5', '')))
      .toEqual(stateA);
    expect(todos(stateA, actions.editTodo('1', 'Update')))
      .toEqual([
        { title: 'Update', status: 'needsAction', id: '1' },
        { title: 'Second Todo', status: 'needsAction', id: '2' },
      ]);
    expect(todos(stateA, actions.editTodo('2', 'Second Update')))
      .toEqual([
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Second Update', status: 'needsAction', id: '2' },
      ]);
  });

  it('should handle MOVE_TODO', () => {
    const stateA = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
      { title: 'Third Todo', status: 'needsAction', id: '3' },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.moveTodo(0, 1)))
      .toEqual([
        { title: 'Second Todo', status: 'needsAction', id: '2' },
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Third Todo', status: 'needsAction', id: '3' },
      ]);
    expect(todos(stateA, actions.moveTodo(0, 2)))
      .toEqual([
        { title: 'Second Todo', status: 'needsAction', id: '2' },
        { title: 'Third Todo', status: 'needsAction', id: '3' },
        { title: 'First Todo', status: 'needsAction', id: '1' },
      ]);
    expect(todos(stateA, actions.moveTodo(2, 0)))
      .toEqual([
        { title: 'Third Todo', status: 'needsAction', id: '3' },
        { title: 'First Todo', status: 'needsAction', id: '1' },
        { title: 'Second Todo', status: 'needsAction', id: '2' },
      ]);
  });

  it('should handle CLEAR_TODO', () => {
    const stateA = [
      { title: 'First Todo', status: 'completed', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
      { title: 'Third Todo', status: 'completed', id: '3' },
      { title: 'Another Task', status: 'completed', id: '4' },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.clearCompleted()))
      .toEqual([
        { title: 'Second Todo', status: 'needsAction', id: '2' },
      ]);

    const stateB = [
      { title: 'First Todo', status: 'completed', id: '1' },
      { title: 'Second Todo', status: 'completed', id: '2' },
      { title: 'Third Todo', status: 'completed', id: '3' },
    ];
    deepFreeze(stateB);
    expect(todos(stateB, actions.clearCompleted()))
      .toEqual([]);

    const stateC = [
      { title: 'First Todo', status: 'needsAction', id: '1' },
      { title: 'Second Todo', status: 'needsAction', id: '2' },
      { title: 'Third Todo', status: 'needsAction', id: '3' },
    ];
    deepFreeze(stateC);
    expect(todos(stateC, actions.clearCompleted()))
      .toEqual(stateC);
  });
});
