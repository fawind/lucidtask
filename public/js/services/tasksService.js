angular.module('lucidtask')
  .factory('TasksService', ['$http', '$q', function($http, $q) {

    function executeRequest(request) {
      var errorMessage = 'Oops, something went wrong!';

      return $q(function(resolve, reject) {
        request.execute(function(response) {
          if (response.error) {
            Materialize.toast(errorMessage, 3000);
            console.error(
              'API error (' + response.error.code + '):',
              response.error.message
            );

            reject(response);
          }
          else {
            resolve(response);
          }
        });
      });
    }

    function getTasks(taskList) {
      var body = {
        tasklist: taskList
      };

      var request = gapi.client.tasks.tasks.list(body);

      return executeRequest(request);
    }

    function addTask(taskList, title, previousId) {
      var body = {
        tasklist: taskList,
        title: title
      };

      if (previousId && previousId !== -1) {
        body.previous = previousId;
      }

      var request = gapi.client.tasks.tasks.insert(body);

      return executeRequest(request);
    }

    function deleteTask(taskList, taskId) {
      var body = {
        tasklist: taskList,
        task: taskId
      };

      var request = gapi.client.tasks.tasks.delete(body);

      return executeRequest(request);
    }

    function updateTask(taskList, task) {
      var body = {
        tasklist: taskList,
        task: task.id,
        id: task.id,
        title: task.title,
        status: task.status
      };

      var request = gapi.client.tasks.tasks.update(body);

      return executeRequest(request);
    }

    function moveTask(taskList, taskId, previousId) {
      var body = {
        tasklist: taskList,
        task: taskId
      };

      if (previousId && previousId !== -1) {
        body.previous = previousId;
      }

      var request = gapi.client.tasks.tasks.move(body);

      return executeRequest(request);
    }

    function clearTasks(taskList) {
      var body = {
        tasklist: taskList
      };

      var request = gapi.client.tasks.tasks.clear(body);

      return executeRequest(request);
    }

    function getLists() {
      var request = gapi.client.tasks.tasklists.list();
      return executeRequest(request);
    }

    return {
      getTasks: getTasks,
      updateTask: updateTask,
      deleteTask: deleteTask,
      moveTask: moveTask,
      addTask: addTask,
      clearTasks: clearTasks,
      getLists: getLists
    };
  }]);
