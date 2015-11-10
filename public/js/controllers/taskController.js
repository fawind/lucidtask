angular.module('lucidtask')
  .controller('TaskController', ['$scope', 'chroma', 'lodash', 'BroadcastService', 'TasksService',
    function ($scope, chroma, _, broadcastService, tasksService) {

    $scope.loading = true;
    var taskScale = chroma.chroma.scale(['#F44336', '#FFD54F']);

    $scope.models = {
      tasks: [],
      done: []
    };

    $scope.taskColor = function(index) {
      return { backgroundColor: taskScale(index) };
    };

    $scope.updateTitle = function(index) {
      var changedTask = $scope.models.tasks[index];

      tasksService.updateTask(changedTask)
        .then(function(response) {
          console.log(response);
        });
    };

    $scope.add = function() {
      var newTitle = 'New task';
      var taskLength = $scope.models.tasks.length;
      var previousId = -1;

      if (taskLength > 0)
        previousId = $scope.models.tasks[taskLength - 1].id;

      var newTaskLength = $scope.models.tasks.push({ title: newTitle });

      tasksService.addTask(newTitle, previousId)
        .then(function(response) {
          $scope.models.tasks[newTaskLength - 1] = response;
        });
    };

    $scope.dismissDone = function() {
      $scope.models.done = [];
      tasksService.clearTasks()
        .then(function(response) {
          console.log(response);
        });
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
      var deletedTaskId = $scope.models.tasks[sourceIndex].id;

      $scope.models.tasks[sourceIndex].status = 'completed';
      var dismissedTask = _.clone($scope.models.tasks[sourceIndex]);
      $scope.models.done.push(dismissedTask);
      e.source.nodeScope.remove();

      tasksService.updateTask(dismissedTask)
        .then(function(response) {
          console.log(response);
        });
    }

    function deleteTask(e) {
      var sourceIndex = e.source.index;
      var deletedTaskId = $scope.models.tasks[sourceIndex].id;
      e.source.nodeScope.remove();

      tasksService.deleteTask(deletedTaskId)
        .then(function(response) {
          console.log(response);
        });
    }

    function moveTask(e) {
      var sourceIndex = e.source.index;
      var destIndex = e.dest.index;
      var movedTaskId = $scope.models.tasks[destIndex].id;
      
      var previousId = -1;
      if (destIndex !== 0) {
        previousId = $scope.models.tasks[destIndex - 1].id;
      }

      tasksService.moveTask(movedTaskId, previousId)
        .then(function(results) {
          console.log(results);
        });
    }

    $scope.options = {
      dragMove: function(e) { changeBackground(e); },
      dragStop: function(e) { handleDrop(e); }
    };

    broadcastService.apiLoaded.listen(function() {
      console.log('api loaded!');
      tasksService.getTasks()
        .then(function(response) {
          $scope.loading = false;
          console.log(response.items);

          _.each(response.items, function(task) {
            if (task.status === 'completed') {
              $scope.models.done.push(task);
            } else {
              $scope.models.tasks.push(task);
            }
          });

        });
    });

  }]);
