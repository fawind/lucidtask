angular.module('lucidtask')
  .controller('TaskController', ['$scope', 'chroma', 'lodash', function ($scope, chroma, _) {

    var taskScale = chroma.chroma.scale(['#F44336', '#FFD54F']);

    var mockTasks = [
      { label: 'Go to the gym' },
      { label: 'Buy groceries' },
      { label: 'Pick up dry cleaning' },
      { label: 'Reply to morning emails' },
      { label: 'Mow the lawn' }
    ];

    $scope.models = {
      tasks: mockTasks,
      done: [],
      initialTasks: _.clone(mockTasks, true)
    };

    $scope.changed = function() {
      for (var i = 0; i < $scope.models.tasks.length; ++i) {
        if ($scope.models.initialTasks[i] === undefined) {
          return true;
        }
        if ($scope.models.tasks[i].label !== $scope.models.initialTasks[i].label) {
          return true;
        }
      }
      return false;
    };

    $scope.taskColor = function(index) {
      return { backgroundColor: taskScale(index) };
    };

    $scope.add = function() {
      $scope.models.tasks.push({ label: 'New task' });
    };

    $scope.save = function() {
      console.log('Save tasks');
    };

    $scope.dismissDone = function() {
      $scope.models.done = [];
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

      var index = e.source.index;
      var xDiff = e.pos.nowX - e.pos.startX;
      var yDiff = e.pos.nowY - e.pos.startY;

      if (yDiff <= topThreshold && yDiff >= bottomThreshold) {
        if (xDiff > deleteThreshold) {
          // Mark task as done
          $scope.models.done.push(_.clone($scope.models.tasks[index]));
          e.source.nodeScope.remove();
        }
        if (xDiff < doneThreshold) {
          // Delete task
          e.source.nodeScope.remove();
        }
      }
    }

    $scope.options = {
      dragMove: function(e) { changeBackground(e); },
      dragStop: function(e) { handleDrop(e); }
    };

  }]);
