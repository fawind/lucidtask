angular.module('lucidtask')
  .factory('TasksService', ['$http', '$q', function($http, $q) {

    var mockListId = 'MDYxNzIwODMyMTMyNjg3Njg4MzA6MzI4NjE3NTgzOjA';

    function executeRequest(request) {
      return $q(function(resolve, reject) {
        request.execute(function(response) {
          resolve(response);
        });
      });
    }

    function getTasks() {
      var body = {
        tasklist: mockListId
      };

      var request = gapi.client.tasks.tasks.list(body);

      return executeRequest(request);
    }

    function addTask(title, previousId) {
      var body = {
        tasklist: mockListId,
        title: title
      };

      if (previousId && previousId !== -1) {
        body.previous = previousId;
      }

      var request = gapi.client.tasks.tasks.insert(body);

      return executeRequest(request);
    }

    function deleteTask(taskId) {
      var body = {
        tasklist: mockListId,
        task: taskId
      };

      var request = gapi.client.tasks.tasks.delete(body);

      return executeRequest(request);
    }

    function updateTask(task) {
      var body = {
        tasklist: mockListId,
        task: task.id,
        id: task.id,
        title: task.title
      };

      var request = gapi.client.tasks.tasks.update(body);

      return executeRequest(request);
    }

    function moveTask(taskId, previousId) {
      var body = {
        tasklist: mockListId,
        task: taskId
      };

      if (previousId && previousId !== -1) {
        body.previous = previousId;
      }

      var request = gapi.client.tasks.tasks.move(body);

      return executeRequest(request);
    }

    return {
      getTasks: getTasks,
      updateTask: updateTask,
      deleteTask: deleteTask,
      moveTask: moveTask,
      addTask: addTask
    };
  }]);
