import expect from 'expect';
import * as actions from '../../src/actions/todos';

describe('todo actions', () => {
  it('addTodo should create ADD_TODO action', () => {
    expect(actions.addTodo('New Todo'))
      .toEqual({
        type: 'ADD_TODO',
        id: '0',
        title: 'New Todo',
      });
  });

  it('toggleTodo should create TOGGLE_TODO action', () => {
    expect(actions.toggleTodo(1))
      .toEqual({
        type: 'TOGGLE_TODO',
        id: '1',
      });
  });

  it('deleteTodo should create DELETE_TODO action', () => {
    expect(actions.deleteTodo(1))
      .toEqual({
        type: 'DELETE_TODO',
        id: '1',
      });
  });

  it('editTodo should create EDIT_TODO action', () => {
    expect(actions.editTodo(1, 'New Text'))
      .toEqual({
        type: 'EDIT_TODO',
        id: '1',
        title: 'New Text',
      });
  });

  it('moveTodo should create MOVE_TODO action', () => {
    expect(actions.moveTodo(0, 2))
      .toEqual({
        type: 'MOVE_TODO',
        fromIndex: 0,
        toIndex: 2,
      });
  });

  it('clearCompleted should create CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted())
      .toEqual({ type: 'CLEAR_COMPLETED' });
  });
});
