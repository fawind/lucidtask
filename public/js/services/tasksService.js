angular.module('lucidtask')
  .factory('TasksService', ['$http', '$q', function($http, $q) {

    var defaultList = '@default';

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

    function getTasks() {
      var body = {
        tasklist: defaultList
      };

      var request = gapi.client.tasks.tasks.list(body);

      return executeRequest(request);
    }

    function addTask(title, previousId) {
      var body = {
        tasklist: defaultList,
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
        tasklist: defaultList,
        task: taskId
      };

      var request = gapi.client.tasks.tasks.delete(body);

      return executeRequest(request);
    }

    function updateTask(task) {
      var body = {
        tasklist: defaultList,
        task: task.id,
        id: task.id,
        title: task.title,
        status: task.status
      };

      var request = gapi.client.tasks.tasks.update(body);

      return executeRequest(request);
    }

    function moveTask(taskId, previousId) {
      var body = {
        tasklist: defaultList,
        task: taskId
      };

      if (previousId && previousId !== -1) {
        body.previous = previousId;
      }

      var request = gapi.client.tasks.tasks.move(body);

      return executeRequest(request);
    }

    function clearTasks() {
      var body = {
        tasklist: defaultList
      };

      var request = gapi.client.tasks.tasks.clear(body);

      return executeRequest(request);
    }

    return {
      getTasks: getTasks,
      updateTask: updateTask,
      deleteTask: deleteTask,
      moveTask: moveTask,
      addTask: addTask,
      clearTasks: clearTasks
    };
  }]);
