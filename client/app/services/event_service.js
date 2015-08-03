angular.module('classroom.EventService', [])

.service('Events', function ($http) {

  // This service function gets a user's events from the server.
  this.getUserEvents = function (user_id) {
    return $http({
      url: '/events/?user_id=' + user_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };

});