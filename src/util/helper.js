export const getLastTaskId = (tasks) => {
  if (tasks.length === 0) return null;
  return tasks[tasks.length - 1].id;
};

export const getActiveList = (lists) => {
  const activeList = lists.filter(l => l.active);
  if (activeList.length === 0) return null;
  return activeList[0];
};

export const getTask = (tasks, id) => tasks.filter(t => t.id === id)[0];

export const getRandomId = () => Math.random().toString(36).substring(7);
