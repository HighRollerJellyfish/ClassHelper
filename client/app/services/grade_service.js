/**
This service module has functions to deal with grade data.
@class classroom.GradeService
*/

angular.module('classroom.GradeService', [])

.service('Grades', function ($http, $rootScope) {

  /**
  This service function gets a user's grades from the server.
  @method getForUser
  @param {String} username currentUser
  @return {Function} Returns a $http() Get promise.
  */
  this.getStudentGrades = function (student_id) {
    return $http({
      url: '/grades/student/?student_id=' + student_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };

  this.getClassGrades = function(class_id) {
    return $http({
      url: '/grades/class/?class_id=' + class_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };


  /**
  This service function posts grade data to the server.
  @method add
  @param {Object} gradeData Grades data from database.
  @return {Function} Returns a $http() Post promise.
  */
  // this.add = function (gradeData) {
  //   return $http({
  //     method: 'POST',
  //     url: '/grades',
  //     data: gradeData,
  //     headers: {
  //       'Authorization': window.localStorage.jwtToken
  //     }
  //   });
  // };
});