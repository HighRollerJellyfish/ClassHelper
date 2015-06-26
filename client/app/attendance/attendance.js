/**
This module 
@module classroom.attendence
*/

angular.module('classroom.attendance', [])
.controller('AttendanceController', ['$rootScope', '$scope', '$state', 'GetAttendance', 'AddAttendance', function ($rootScope, $scope, $state, GetAttendance, AddAttendance) {
  $scope.isCollapsed = false;

  /**
  @method isTeacher
  */
  $scope.isTeacher = function () {
    return $rootScope.currentUser.role === 'teacher';
  }
  /**
  @method addAttendance
  @param attendanceData  data to be added to database.
  */
  $scope.addAttendance = function (attendanceData) {
    console.log(attendanceData);
    AddAttendance.add(attendanceData);
  }
  
  //checks if the user has the role teacher and returns all the attendance
  //records.  If the user's role is not teacher, then it returns just the
  //attendance of the user.
  if ($rootScope.currentUser.role === 'teacher') {
    GetAttendance.allAttendance().then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  } else {
    GetAttendance.attendanceForUser($rootScope.currentUser.username).then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  }
}]);