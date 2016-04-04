let nextTodoId = 10;

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});

export const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  id,
  text,
});

export const moveTodo = (fromIndex, toIndex) => ({
  type: 'MOVE_TODO',
  fromIndex,
  toIndex,
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});
