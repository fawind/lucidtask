(function() {
  var app = angular.module('lucidtask',
    [
      'ngLodash',
      'chroma.angularChroma',
      'ui.tree',
      'puElasticInput'
    ]
  );

  app.constant('CLIENT_ID', '627669549946-o1283nd2h1or6j4edl6kl0v2auil9343.apps.googleusercontent.com');
  app.constant('SCOPES', ['https://www.googleapis.com/auth/tasks']);

})();

/* 
 * Google API callback
 * Load initAuth() from AuthController
 */
var init = function() {
  window.initAuth();
};
