angular.module('lucidtask')
  .controller('AuthController', ['$scope', '$window', 'AuthService', 'CLIENT_ID', 'SCOPES',
    function ($scope, $window, authService, CLIENT_ID, SCOPES) {

    $window.initAuth = function() {
      authService.checkAuth();
    };

  }]);
