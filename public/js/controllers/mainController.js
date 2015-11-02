angular.module('lucidtask')
  .controller('TaskController', ['$scope', 'chroma', function ($scope, chroma) {

    var taskScale = chroma.chroma.scale(['#F44336', '#FFD54F']);

    var mockTasks = [
      { label: 'Go to the gym' },
      { label: 'Buy groceries' },
      { label: 'Pick up dry cleaning' },
      { label: 'Reply to morning emails' },
      { label: 'Mow the lawn' }
    ];

    $scope.models = { tasks: mockTasks };

    $scope.taskColor = function(index) {
      return { backgroundColor: taskScale(index) };
    };

    $scope.add = function() {
      console.log('Add task');
    };

    $scope.save = function() {
      console.log('Save tasks');
    };

  }]);
