angular.module('classroom.AssignmentService', [])

.service('Assignments', function ($http) {

  // This service function gets a user's assignments from the server.
  this.getUserAssignments = function (user_id) {
    return $http({
      url: '/assignments/?user_id=' + user_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };

  this.getClassAssignments = function (class_id) {
    return $http({
      url: '/assignments/class/?class_id=' + class_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  }

});