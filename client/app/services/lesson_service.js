angular.module('classroom.LessonService', [])

.service('Lessons', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets the lessons from the server.
  @method getAll
  @return function Returns a $http() Get promise.
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
