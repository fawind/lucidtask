angular.module('lucidtask')
  .factory('AuthService', ['$q', 'BroadcastService', 'CLIENT_ID', 'SCOPES',
    function($q, broadcastService, CLIENT_ID, SCOPES) {

    function renewSession() {
      var body = {
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        immediate: true
      };

      return $q(function(resolve, reject) {
        gapi.auth.authorize(body, function(authResult) {
          if (authResult && !authResult.error) {
            resolve(authResult);
          } else {
            reject(authResult);
          }
        });
      });
    }

    /* Check if session is still valid */
    function checkAuth() {
      var body = {
        client_id: CLIENT_ID,
        scope: SCOPES.join(' '),
        immediate: true
      };

      gapi.auth.authorize(body, handleAuthResult);
    }

    /* Load task api or authorization popup */
    function handleAuthResult(authResult) {
      if (authResult && !authResult.error) {
        loadTasksApi();
      } else {
        authorize();
      }
    }

    /* Load authorization popup */
    function authorize() {
      var body = {
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
      };

      gapi.auth.authorize(body, handleAuthResult);
    }

    /* Authorized, load tasks api */
    function loadTasksApi() {
      gapi.client.load('tasks', 'v1', taskApiLoaded);
    }

    function taskApiLoaded() {
      broadcastService.apiLoaded.broadcast();
    }

    return {
      checkAuth: checkAuth,
      renewSession: renewSession
    };

  }]);
