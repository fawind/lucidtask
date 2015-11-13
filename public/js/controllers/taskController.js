angular.module('lucidtask')
  .controller('TaskController', ['$scope', 'chroma', 'lodash', 'BroadcastService', 'TasksService',
    function ($scope, chroma, _, broadcastService, tasksService) {

    $scope.loading = true;
    var taskScale = chroma.chroma.scale(['#F44336', '#FFD54F']);

    $scope.models = {
      tasks: [],
      done: []
    };

    var taskList = '@default';

    $scope.taskColor = function(index) {
      return { backgroundColor: taskScale(index) };
    };

    $scope.updateTitle = function(index, oldTitle) {
      var changedTask = $scope.models.tasks[index];

      tasksService.updateTask(taskList, changedTask)
        .then(
          function(response) {},
          function(error) { changedTask.title = oldTitle; }
        );
    };

    $scope.add = function() {
      var newTitle = 'New task';
      var taskLength = $scope.models.tasks.length;
      var previousId = -1;

      if (taskLength > 0)
        previousId = $scope.models.tasks[taskLength - 1].id;

      var newTaskLength = $scope.models.tasks.push({ title: newTitle });

      tasksService.addTask(taskList, newTitle, previousId)
        .then(
          function(response) {
            $scope.models.tasks[newTaskLength - 1] = response;
          },
          function(error) {
            $scope.models.tasks.splice(newTaskLength - 1, 1);
          }
        );
    };

    $scope.dismissDone = function() {
      var doneTasks = $scope.models.done;
      $scope.models.done = [];
      tasksService.clearTasks(taskList)
        .then(
          function(response) {},
          function(error) { $scope.models.done = doneTasks; }
        );
    };

    function changeBackground(e) {
      var deleteThreshold = 100;
      var doneThreshold = -100;
      var topThreshold = 40;
      var bottomThreshold = -40;

      var index = e.source.index;
      var doneScale = chroma.chroma.scale(['#263238', '#8BC34A']);
      var deleteScale = chroma.chroma.scale(['#263238', '#E53935']);

      var xDiff = e.pos.nowX - e.pos.startX;
      var yDiff = e.pos.nowY - e.pos.startY;

      if (yDiff <= topThreshold && yDiff >= bottomThreshold) {
        if (xDiff > 0) {
          $scope.backgroundColor = { backgroundColor: doneScale(xDiff / deleteThreshold) };
        } else {
          $scope.backgroundColor = { backgroundColor: deleteScale(Math.abs(xDiff) / deleteThreshold) };
        }
      } else {
        $scope.backgroundColor = { backgroundColor: '#263238' };
      }
    }

    function handleDrop(e) {
      $scope.backgroundColor = { backgroundColor: '#263238' };
      var deleteThreshold = 100;
      var doneThreshold = -100;
      var topThreshold = 40;
      var bottomThreshold = -40;

      var sourceIndex = e.source.index;
      var destIndex = e.dest.index;
      var xDiff = e.pos.nowX - e.pos.startX;
      var yDiff = e.pos.nowY - e.pos.startY;

      /* Check if delete or dismissed */
      if (yDiff <= topThreshold && yDiff >= bottomThreshold && sourceIndex === destIndex) {
        if (xDiff > deleteThreshold) {
          dismissTask(e);
        }
        else if (xDiff < doneThreshold) {
          deleteTask(e);
        }
      }
      else {
        moveTask(e);
      }
    }

    function dismissTask(e) {
      var sourceIndex = e.source.index;

      $scope.models.tasks[sourceIndex].status = 'completed';
      var dismissedTask = _.clone($scope.models.tasks[sourceIndex]);
      $scope.models.done.push(dismissedTask);
      e.source.nodeScope.remove();

      tasksService.updateTask(taskList, dismissedTask)
        .then(
          function(response) {},
          function(error) {
            dismissedTask.status = 'needsAction';
            $scope.models.done.pop();
            $scope.models.tasks.splice(sourceIndex, 0, dismissedTask);
          }
        );
    }

    function deleteTask(e) {
      var sourceIndex = e.source.index;
      var deletedTask = $scope.models.tasks[sourceIndex];
      e.source.nodeScope.remove();

      tasksService.deleteTask(taskList, deletedTask.id)
        .then(
          function(response) {},
          function(error) {
            $scope.models.tasks.splice(sourceIndex, 0, deletedTask);
          }
        );
    }

    function moveTask(e) {
      var sourceIndex = e.source.index;
      var destIndex = e.dest.index;
      var movedTaskId = $scope.models.tasks[destIndex].id;
      
      var previousId = -1;
      if (destIndex !== 0) {
        previousId = $scope.models.tasks[destIndex - 1].id;
      }

      tasksService.moveTask(taskList, movedTaskId, previousId)
        .then(
          function(results) {},
          function(error) {
            var movedTask = $scope.models.tasks.splice(destIndex, 1)[0];
            $scope.models.tasks.splice(sourceIndex, 0, movedTask);
          }
        );
    }

    $scope.options = {
      dragMove: function(e) { changeBackground(e); },
      dragStop: function(e) { handleDrop(e); }
    };

    function fillTasks(tasks) {
      $scope.models.tasks = [];
      $scope.models.done = [];
      
      _.each(tasks, function(task) {
        if (task.status === 'completed') {
          $scope.models.done.push(task);
        } else {
          $scope.models.tasks.push(task);
        }
      });
    }

    broadcastService.apiLoaded.listen(function() {
      tasksService.getTasks(taskList)
        .then(function(response) {
          $scope.loading = false;
          fillTasks(response.items);
        });
    });

    broadcastService.listChanged.listen(function(id) {
      taskList = id;
      tasksService.getTasks(taskList)
        .then(function(response) {
          $scope.loading = false;
          fillTasks(response.items);
        });
    });

  }]);
