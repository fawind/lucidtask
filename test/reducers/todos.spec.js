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
      .toEqual([{ text: 'New Todo', completed: false, id: 1 }]);

    const stateA = [{ text: 'First Todo', completed: false, id: 1 }];
    deepFreeze(stateA);
    expect(todos(stateA, actions.addTodo('Next Todo')))
      .toEqual([
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Next Todo', completed: false, id: 2 },
      ]);

    const stateB = [
      { text: 'First Todo', completed: false, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
    ];
    deepFreeze(stateB);
    expect(todos(stateB, actions.addTodo('Another Todo')))
      .toEqual([
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Second Todo', completed: false, id: 2 },
        { text: 'Another Todo', completed: false, id: 3 },
      ]);
  });

  it('should handle TOGGLE_TODO', () => {
    const stateA = [
      { text: 'First Todo', completed: false, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.toggleTodo(4)))
      .toEqual(stateA);
    expect(todos(stateA, actions.toggleTodo(1)))
      .toEqual([
        { text: 'First Todo', completed: true, id: 1 },
        { text: 'Second Todo', completed: false, id: 2 },
      ]);
    expect(todos(stateA, actions.toggleTodo(2)))
      .toEqual([
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Second Todo', completed: true, id: 2 },
      ]);

    const stateB = [
      { text: 'First Todo', completed: true, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
    ];
    deepFreeze(stateB);
    expect(todos(stateB, actions.toggleTodo(1)))
      .toEqual([
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Second Todo', completed: false, id: 2 },
      ]);
  });

  it('should handle DELETE_TODO', () => {
    const stateA = [
      { text: 'First Todo', completed: false, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.deleteTodo(4)))
      .toEqual(stateA);
    expect(todos(stateA, actions.deleteTodo(1)))
      .toEqual([{ text: 'Second Todo', completed: false, id: 2 }]);
    expect(todos(stateA, actions.deleteTodo(2)))
      .toEqual([{ text: 'First Todo', completed: false, id: 1 }]);

    const stateB = [];
    deepFreeze(stateB);
    expect(todos(stateB, actions.deleteTodo(1)))
      .toEqual([]);
  });

  it('should handle EDIT_TODO', () => {
    const stateA = [
      { text: 'First Todo', completed: false, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.editTodo(5, '')))
      .toEqual(stateA);
    expect(todos(stateA, actions.editTodo(1, 'Update')))
      .toEqual([
        { text: 'Update', completed: false, id: 1 },
        { text: 'Second Todo', completed: false, id: 2 },
      ]);
    expect(todos(stateA, actions.editTodo(2, 'Second Update')))
      .toEqual([
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Second Update', completed: false, id: 2 },
      ]);
  });

  it('should handle MOVE_TODO', () => {
    const stateA = [
      { text: 'First Todo', completed: false, id: 1 },
      { text: 'Second Todo', completed: false, id: 2 },
      { text: 'Third Todo', completed: false, id: 3 },
    ];
    deepFreeze(stateA);
    expect(todos(stateA, actions.moveTodo(0, 1)))
      .toEqual([
        { text: 'Second Todo', completed: false, id: 2 },
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Third Todo', completed: false, id: 3 },
      ]);
    expect(todos(stateA, actions.moveTodo(0, 2)))
      .toEqual([
        { text: 'Second Todo', completed: false, id: 2 },
        { text: 'Third Todo', completed: false, id: 3 },
        { text: 'First Todo', completed: false, id: 1 },
      ]);
    expect(todos(stateA, actions.moveTodo(2, 0)))
      .toEqual([
        { text: 'Third Todo', completed: false, id: 3 },
        { text: 'First Todo', completed: false, id: 1 },
        { text: 'Second Todo', completed: false, id: 2 },
      ]);
  });
});
