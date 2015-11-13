angular.module('lucidtask')
  .factory('BroadcastService', ['$rootScope', function($rootScope) {

    var apiLoaded = {
      broadcast: function() {
        $rootScope.$broadcast('api-loaded');
      },
      listen: function(callback) {
        $rootScope.$on('api-loaded', function() {
          callback();
        });
      }
    };

    var listChanged = {
      broadcast: function(id) {
        $rootScope.$broadcast('list-changed', { id: id });
      },
      listen: function(callback) {
        $rootScope.$on('list-changed', function(event, args) {
          callback(args.id);
        });
      }
    };

    return {
      apiLoaded: apiLoaded,
      listChanged: listChanged
    };
  }]);
