angular.module('classroom.attendance', [])
.controller('AttendanceController', function ($rootScope, $scope, $state, GetAttendance) {
  $scope.isCollapsed = false;
  if ($rootScope.currentUser.role === 'teacher') {
    GetAttendance.allAttendance().then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  } else {
    GetAttendance.attendanceForUser($rootScope.currentUser.username).then(function(data) {
      $scope.attendance = angular.fromJson(data.data);
    });
  }
});