export const getLastTaskId = (tasks) => {
  if (tasks.length === 0) return null;
  return tasks[tasks.length - 1].id;
};

export const getTask = (tasks, id) => tasks.filter(t => t.id === id)[0];

export const getRandomId = () => Math.random().toString(36).substring(7);
