/**
This service module has functions to deal with class data.
@class classroom.ClassService
*/

angular.module('classroom.ClassService', [])

.service('Grades', ['$http', '$rootScope', function ($http, $rootScope) {


  // This service function gets a user's classes from the server.


  this.getUserClasses = function (user_id) {
    return $http({
      url: '/grades/student/?user_id=' + user_id,
      method: 'GET',
      headers: {
        'Authorization': window.localStorage.jwtToken
      }
    });
  };






//   /**
//   This service function posts grade data to the server.
//   @method add
//   @param {Object} gradeData Grades data from database.
//   @return {Function} Returns a $http() Post promise.
//   */
//   this.add = function (gradeData) {
//     return $http({
//       method: 'POST',
//       url: '/grades',
//       data: gradeData,
//       headers: {
//         'Authorization': window.localStorage.jwtToken
//       }
//     });
//   }
// }]);