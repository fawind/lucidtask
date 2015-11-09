angular.module('lucidtask')
  .factory('TasksService', ['$http', '$q', function($http, $q) {

    var mockListId = 'MDYxNzIwODMyMTMyNjg3Njg4MzA6MzI4NjE3NTgzOjA';

    function getTasks() {
      var body = {
        tasklist: mockListId
      };

      var request = gapi.client.tasks.tasks.list(body);

      return $q(function(resolve, reject) {
        request.execute(function(response) {
          if (!response.items)
            reject('API-Error: Undefined items');
          else
            resolve(response.items);
        });

      });
    }

    return {
      getTasks: getTasks
    };
  }]);
