/**
This service module has functions to deal with class data.
@class classroom.ClassService
*/

angular.module('classroom.ClassService', [])

.service('Classes', function ($http) {

  // This service function gets a user's classes from the server.
  this.getUserClasses = function (user_id) {
    console.log("Token:", window.localStorage.jwtToken);
    return $http({
      url: '/classes/?user_id=' + user_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };

});
