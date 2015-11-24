angular.module('lucidtask')
  .factory('TasksService', ['$http', '$q', 'AuthService', function($http, $q, authService) {

    var errorMessage = 'Oops, something went wrong!';

    function executeRequest(request) {
      return $q(function(resolve, reject) {
        request.execute(function(response) {
          if (response.error) {
            if (response.error.code === 401) {
              renewSession(request, response, reject);
              return;
            }

            handleError(response, reject);            
          }
          else {
            resolve(response);
          }
        });
      });
    }

    function renewSession(request, response, reject) {
      authService.renewSession()
        .then(
          function(success) {
            executeRequest(request);
          },
          function(response) {
            handleError(response, request);
          }
        );
    }

    function handleError(response, reject) {
      Materialize.toast(errorMessage, 3000);
      console.error(
        'API error (' + response.error.code + '):',
        response.error.message
      );

      reject(response);
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

    function addList(title) {
      var body = {
        title: title
      };

      var request = gapi.client.tasks.tasklists.insert(body);
      return executeRequest(request);
    }

    function deleteList(taskList) {
      var body = {
        tasklist: taskList
      };

      var request = gapi.client.tasks.tasklists.delete(body);
      return executeRequest(request);
    }

    return {
      getTasks: getTasks,
      updateTask: updateTask,
      deleteTask: deleteTask,
      moveTask: moveTask,
      addTask: addTask,
      clearTasks: clearTasks,
      getLists: getLists,
      addList: addList,
      deleteList: deleteList
    };
  }]);
