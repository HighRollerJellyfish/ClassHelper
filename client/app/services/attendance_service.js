/**
This service module contains the functions dealling with attendance data.
@class classroom.AttendanceService
*/

angular.module('classroom.AttendanceService', [])

.service('Attendance', ['$http', '$rootScope', function ($http, $rootScope) {
  /**
  This service function gets all attendance records from the server.
  @method getAll
  @return {function} Returns a $http() Get promise. 
  */
  this.getAll = function () {
    return $http({
      url: '/attendance',
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };
  /**
  This service function gets an individual user's attendance from the server.
  @method getForUser
  @param {String} username 
  @return {function} Returns a $http() Get promise.
  */
  this.getForUser = function (username) {
    return $http({
      //this gets grades for all users right now. it should be '/grades/' + username;
      url: '/attendance?student=' + username,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };
  /**
  This method is a service function that posts attendance data to the server.
  @method add
  @param {Object} attendanceData User entered attendance data.
  @return {function} Returns $http() Post promise.
  */
  this.add = function (attendanceData) {
    return $http({
      method: 'POST',
      url: '/attendance',
      data: attendanceData,
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  }
}]);
