angular.module('lucidtask')
  .controller('ListController', ['$scope', 'BroadcastService', 'TasksService',
    function ($scope, broadcastService, tasksService) {

      $scope.models = {
        lists: []
      };

      $scope.active = 0;

      $scope.loadList = function(index, id) {
        $scope.active = index;
        broadcastService.listChanged.broadcast(id);
      };

      $scope.newList = function() {
        console.log('addList');
      };

      function fillLists(lists) {
        $scope.models.lists = lists.map(function(list) {
          list.label = list.title.charAt(0).toUpperCase();
          return list;
        });
      }

      broadcastService.apiLoaded.listen(function() {
      tasksService.getLists()
        .then(function(response) {
          fillLists(response.items);
          console.log($scope.models.lists);
        });
      });

  }]);
