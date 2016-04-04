let nextTodoId = 0;

export const addTodo = (title) => ({
  type: 'ADD_TODO',
  id: (nextTodoId++).toString(),
  title,
});

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id,
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  id,
});

export const editTodo = (id, title) => ({
  type: 'EDIT_TODO',
  id,
  title,
});

export const moveTodo = (fromIndex, toIndex) => ({
  type: 'MOVE_TODO',
  fromIndex,
  toIndex,
});

export const clearCompleted = () => ({
  type: 'CLEAR_COMPLETED',
});
