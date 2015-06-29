angular.module('classroom.GradeService', [])

.service('Grades', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets all the grades data from the server.
  @method getAll
  @return function Returns a $http() Get promise.
  */
  this.getAll = function () {
    return $http({
      url: '/grades',
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };
  /**
  This service function gets a user's grades from the server.
  @method getForUser
  @param username
  @return function Returns a $http() Get promise.
  */
  this.getForUser = function (username) {
    return $http({
      url: '/grades?student=' + username,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };
  /**
  This service function posts grade data to the server.
  @method add
  @param gradeData
  @return function Returns a $http() Post promise.
  */
  this.add = function (gradeData) {
    return $http({
      method: 'POST',
      url: '/grades',
      data: gradeData,
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  }
}]);