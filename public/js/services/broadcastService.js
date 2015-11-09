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

    return {
      apiLoaded: apiLoaded
    };
  }]);
