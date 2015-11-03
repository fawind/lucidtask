angular.module('lucidtask')
  .controller('TaskController', ['$scope', 'chroma', 'lodash', function ($scope, chroma, _) {

    var taskScale = chroma.chroma.scale(['#F44336', '#FFD54F']);

    var mockTasks = [
      { label: 'Go to the gym', done: false },
      { label: 'Buy groceries', done: false },
      { label: 'Pick up dry cleaning', done: false },
      { label: 'Reply to morning emails', done: false },
      { label: 'Mow the lawn', done: false }
    ];

    $scope.models = { tasks: mockTasks };

    $scope.taskColor = function(index) {
      return { backgroundColor: taskScale(index) };
    };

    $scope.add = function() {
      $scope.models.tasks.push({ label: 'New task' });
    };

    $scope.save = function() {
      console.log('Save tasks');
    };

    $scope.options = {
      dragMove: function(e) {
        // console.log(e);
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
      },
      dragStop: function(e) {
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
            console.log('done');
            $scope.models.tasks[index].done = true;
          }
          if (xDiff < doneThreshold) {
            console.log(e);
            e.source.nodeScope.remove();
            //$scope.models.tasks.splice(index, 1);
            console.log($scope.models.tasks);
          }
        }
      }
    };

  }]);


  // x: +- 100
  // y: +- 40
