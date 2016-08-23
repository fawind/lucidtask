import expect from 'expect';
import deepFreeze from 'deep-freeze';
import reducer from '../../src/reducers/lists';
import * as actions from '../../src/actions/tasks';

const tasks = [
  { id: 1, title: 'Task1', status: 'needsAction' },
  { id: 2, title: 'Task2', status: 'needsAction' },
  { id: 3, title: 'Task3', status: 'completed' },
];
const inactiveLists = [
  { id: 'l1', title: 'List1', active: false },
  { id: 'l2', title: 'List2', active: false },
  { id: 'l3', title: 'List3', active: false },
];
const activeLists = [
  { id: 'l1', title: 'List1', active: false },
  { id: 'l2', title: 'List2', active: true, tasks },
  { id: 'l3', title: 'List3', active: false },
];
deepFreeze(inactiveLists);
deepFreeze(activeLists);

describe('lists reducer', () => {
  describe('should handle initial state', () => {
    it('and return an empty list', () => {
      expect(reducer(undefined, actions.openList(-1)))
        .toEqual([]);
    });
  });

  describe('should handle INIT_LISTS', () => {
    it('should initialize the state', () => {
      expect(reducer(undefined, actions.initLists(inactiveLists)))
        .toEqual(inactiveLists);
    });
  });

  describe('should handle ADD_LIST', () => {
    it('should add a new list', () => {
      expect(reducer([], actions.addList('l1', 'List1')))
        .toEqual([
          { id: 'l1', title: 'List1', active: false },
        ]);
    });

    it('should add a new list to existing ones', () => {
      expect(reducer(inactiveLists, actions.addList('l4', 'List4')))
        .toEqual([
          { id: 'l1', title: 'List1', active: false },
          { id: 'l2', title: 'List2', active: false },
          { id: 'l3', title: 'List3', active: false },
          { id: 'l4', title: 'List4', active: false },
        ]);
    });
  });

  describe('should handle DELETE_LIST', () => {
    it('should delete a list', () => {
      expect(reducer(inactiveLists, actions.deleteList('l2')))
        .toEqual([
          { id: 'l1', title: 'List1', active: false },
          { id: 'l3', title: 'List3', active: false },
        ]);
    });

    it('should not fail on invalid ids', () => {
      expect(reducer(inactiveLists, actions.deleteList('-1')))
        .toEqual([
          { id: 'l1', title: 'List1', active: false },
          { id: 'l2', title: 'List2', active: false },
          { id: 'l3', title: 'List3', active: false },
        ]);
    });
  });

  describe('should handle OPEN_LIST', () => {
    it('should activate a list and add tasks', () => {
      expect(reducer(inactiveLists, actions.openList('l2', tasks)))
        .toEqual(activeLists);
    });

    it('should not fail on invalid ids', () => {
      expect(reducer(inactiveLists, actions.openList('-1', [])))
        .toEqual(inactiveLists);
    });
  });

  describe('should handle CLOSE_LIST', () => {
    it('should close an active list', () => {
      expect(reducer(activeLists, actions.closeList()))
        .toEqual([
          { id: 'l1', title: 'List1', active: false },
          { id: 'l2', title: 'List2', active: false, tasks },
          { id: 'l3', title: 'List3', active: false },
        ]);
    });
  });

  describe('should handle API_ERROR', () => {
    it('should reset the state to oldState', () => {
      const error = { code: 404, message: 'API Error' };
      const globalState = { lists: inactiveLists };
      expect(reducer(activeLists, actions.handleApiError(error, globalState)))
        .toEqual(inactiveLists);
    });
  });
});
