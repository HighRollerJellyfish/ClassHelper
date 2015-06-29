/**
This service module has functions to deal with lesson data.
@class classroom.LessonService
*/


angular.module('classroom.LessonService', [])

.service('Lessons', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets the lessons from the server.
  @method getAll
  @return {Function} Returns a $http() Get promise.
  */
  this.getAll = function() {
    return $http({
      url: '/lessons',
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  }

  /**
  This service function gets the lessons from the server.
  @method add
  @param {Object} lessonData Lesson data to be posted to server database.
  @return {Function} Returns a $http() Post promise.
  */
  this.add = function (lessonData) {
    return $http({
      method: 'POST',
      url: '/lessons',
      data: lessonData,
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  }
}]);
