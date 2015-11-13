angular.module('lucidtask')
  .controller('ListController', ['$scope', 'BroadcastService', 'TasksService',
    function ($scope, broadcastService, tasksService) {

      $scope.models = {
        lists: []
      };

      $scope.active = 0;

      $scope.loadList = function(index) {
        $scope.active = index;
        var id = $scope.models.lists[index].id;
        broadcastService.listChanged.broadcast(id);
      };

      $scope.newList = function() {
        var title = prompt("New list title", "");

        if (title !== null && title.length > 0) {
          tasksService.addList(title)
            .then(
              function(results) {
                var newList = results.result;
                newList.label = newList.title.charAt(0).toUpperCase();
                $scope.models.lists.push(newList);
                var newIndex = $scope.models.lists.length - 1;
                $scope.loadList(newIndex);
              }
            );
        }
      };

      $scope.deleteList = function(index) {
        var confirmed = confirm("Are you sure you want to delete this list?");

        if (!confirmed) {
          return;
        }

        var id = $scope.models.lists[index].id;

        tasksService.deleteList(id)
          .then(function(results) {
              $scope.models.lists.splice(index, 1);
              if ($scope.models.lists.length > 0) {
                $scope.active = 0;
                $scope.loadList($scope.active);
              }
          });
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
        });
      });

  }]);
